/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarNavegation from "../../components/SideBarNavegation";
import { useAuth } from "../../components/Context/AuthContext";
import UrbanizationCard from "../../components/UrbanizationCard";
import CardResidence from "../../components/CardResidence";
import ResultQuestion from "../../components/ResultQuestion";

function Residence() {
  const [question, setQuestion] = useState("");

  const [houseArray, setHouseArray] = useState();
  const [newQuestionStatus, setNewQuestionStatues] = useState(true);
  const [houseData, sethouseData] = useState({
    cc: "",
    name: "",
    housenumber: "",
    phone: "",
    votacion: false,
    password: "",
  });
  const [dataVote, setDataVote] = useState();
  const [voteCode, setVoteCode] = useState("");
  const {
    addHouse,
    useSweetAlert,
    realtimeCollectionCheck,
    createVote,
    addquestion,
    realtimeCollectionVote,
    resetVoteActive,
    endVote,
  } = useAuth();
  const id = useParams();
  const oneResidence = async () => {
    await realtimeCollectionCheck(id, setHouseArray);
    if (localStorage.code) {
      setVoteCode(localStorage.getItem("code"));
    }
  };

  useEffect(() => {
    oneResidence();
  }, []);

  useEffect(() => {
    voteCode && realtimeCollectionVote(setDataVote, voteCode);
  }, [voteCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    sethouseData({ ...houseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !houseData.cc ||
      !houseData.name ||
      !houseData.housenumber ||
      !houseData.phone
    ) {
      return useSweetAlert(
        "Validacion",
        "Ninguno de los datos puede estar vacio",
        "error",
      );
    }
    addHouse(id, houseData);
    sethouseData({
      cc: "",
      name: "",
      housenumber: "",
      phone: "",
      votacion: false,
      password: "",
    });
    return useSweetAlert(
      "Exitoso",
      `casa ${houseData.housenumber} creada`,
      "success",
    );
  };

  const createVoteLink = () => {
    try {
      let houseVoteActive = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const houseNum in houseArray.house) {
        if (houseArray.house[houseNum].votacion === true) {
          const { votacion, housenumber, password } =
            houseArray.house[houseNum];
          houseVoteActive = {
            ...houseVoteActive,
            [houseNum]: {
              votacion,
              housenumber,
              password,
            },
          };
        }
      }

      if (!Object.values(houseVoteActive).length) {
        return useSweetAlert(
          "error",
          "lista de participantes no puede estar vacia",
          "error",
        );
      }

      const resultCode = [];
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 5; i += 1) {
        resultCode.push(
          characters.charAt(Math.floor(Math.random() * characters.length)),
        );
      }
      if (!localStorage.code) {
        localStorage.setItem("code", resultCode.join(""));
        setVoteCode(localStorage.getItem("code"));

        createVote(
          { houseVoteActive, questions: {}, idUrb: id.id, state: true },
          resultCode.join(""),
          id.id,
        );
      }
      return null;
    } catch (error) {
      return useSweetAlert("error", error.message, "error");
    }
  };

  const handleEndVote = () => {
    if (!newQuestionStatus) {
      return useSweetAlert(
        "Error",
        "no puedes termiar una votacion con una pregunta activa",
        "error",
      );
    }
    endVote(voteCode, id.id);
    localStorage.removeItem("code");
    setVoteCode("");
    return null;
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!question) {
      return useSweetAlert(
        "ERROR",
        "no puedes enviar una pregunta vacia",
        "error",
      );
    }
    await addquestion(voteCode, question);
    setNewQuestionStatues(false);
    return null;
  };

  const handleNewQuestion = () => {
    setQuestion("");
    resetVoteActive(dataVote, voteCode);
    setNewQuestionStatues(true);
  };
  return (
    <div className="flex gap-1  ">
      <SideBarNavegation />
      <section className="h-screen grid grid-cols-3 w-full ">
        <div className=" h-full grid place-items-center overflow-y-auto">
          {houseArray && <UrbanizationCard urbanizationData={houseArray} />}
          <article className="text-center ">
            <h1 className="uppercase font-bold">Crear casa</h1>
            <form onSubmit={handleSubmit}>
              <section className="flex flex-col justify-between">
                <label htmlFor="password" className="font-bold">
                  numero de casa *
                  <input
                    className="text-center border-2 border-gray-400 rounded-3xl  block  w-full bg-inherit "
                    type="number"
                    name="housenumber"
                    placeholder="1058"
                    value={houseData.housenumber}
                    onChange={handleChange}
                  />
                </label>

                <label htmlFor="email" className="font-bold">
                  cedula propietario*
                  <input
                    className="text-center border-2 border-gray-400 rounded-3xl  block  w-full bg-inherit"
                    type="number"
                    name="cc"
                    placeholder="1128...."
                    value={houseData.cc}
                    onChange={handleChange}
                  />
                </label>

                <label htmlFor="password" className="font-bold">
                  nombre propietario*
                  <input
                    className="text-center border-2 border-gray-400 rounded-3xl  block  w-full bg-inherit"
                    type="text"
                    name="name"
                    placeholder="nombre"
                    value={houseData.name}
                    onChange={handleChange}
                  />
                </label>

                <label htmlFor="password" className="font-bold">
                  celular propietario *
                  <input
                    className="text-center border-2 border-gray-400 rounded-3xl  block  w-full bg-inherit  "
                    type="number"
                    name="phone"
                    placeholder="0000000"
                    value={houseData.phone}
                    onChange={handleChange}
                  />
                </label>

                <label htmlFor="password" className="font-bold">
                  contrasena *
                  <input
                    className="text-center border-2 border-gray-400 rounded-3xl  block  w-full bg-inherit  mb-2"
                    type="text"
                    name="password"
                    placeholder="contrasena"
                    value={houseData.password}
                    onChange={handleChange}
                  />
                </label>
              </section>

              <button
                type="submit"
                className="text-center bg-blue-900  rounded-3xl p-1  mb-4 w-full text-white capitalize hover:bg-blue-700"
              >
                crear
              </button>
            </form>
          </article>
        </div>
        <div className="h-screen overflow-y-auto p-4">
          <h1 className="uppercase font-bold mb-4 text-center">
            casas registradas
          </h1>
          <section className="flex items-center border-b-2 border-black mb-2 font-bold uppercase">
            <p className="w-1/4 text-center ">Nombre</p>
            <p className="w-1/4 text-center">Casa</p>
            <p className="w-1/4 text-center">Celular</p>
            <p className="w-1/4 text-center">Check</p>
          </section>
          {houseArray &&
            Object.values(houseArray.house).map((house) => (
              <CardResidence house={house} key={house.cc} />
            ))}

          {voteCode && (
            <>
              <p className="text-center mb-2 font-bold uppercase">
                votacion iniciada
              </p>
              <h3 className="text-center mb-2 font-bold">
                <p>urbvote.vercel.app/votelobby</p>
                <p>codigo: {voteCode}</p>
              </h3>
            </>
          )}
          <button
            type="button"
            className={
              !voteCode
                ? "text-center bg-blue-900  rounded-3xl p-1 mb-4 w-full text-white capitalize hover:bg-blue-700"
                : "text-center bg-gray-700  rounded-3xl p-1 mb-4 w-full text-white capitalize "
            }
            onClick={createVoteLink}
            disabled={!!voteCode}
          >
            iniciar votacion
          </button>
          <button
            type="button"
            className={
              voteCode
                ? "text-center bg-red-900  rounded-3xl p-1 mb-4 w-full text-white capitalize hover:bg-red-700"
                : "text-center bg-gray-700  rounded-3xl p-1 mb-4 w-full text-white capitalize "
            }
            onClick={handleEndVote}
            disabled={!voteCode}
          >
            terminar votacion
          </button>
        </div>
        <section className=" text-center  h-screen p-4">
          <article>
            <p className="uppercase " />
            {voteCode ? (
              newQuestionStatus ? (
                <form onSubmit={handleSubmitQuestion}>
                  <label htmlFor="email" className="font-bold mb-2">
                    PREGUNTA
                    <input
                      className="text-center border-2 border-gray-400 rounded-3xl  block  w-full bg-inherit mb-2"
                      type="text"
                      name="question"
                      placeholder="crear pregunta "
                      value={question}
                      onChange={(e) => {
                        setQuestion(e.target.value);
                      }}
                    />
                  </label>

                  <button
                    type="submit"
                    className="text-center bg-blue-900  rounded-3xl p-1  mb-4 w-full text-white capitalize hover:bg-blue-700"
                  >
                    crear pregunta
                  </button>
                </form>
              ) : (
                <>
                  <ResultQuestion dataVote={dataVote} />
                  <button
                    type="button"
                    className="text-center bg-red-900  rounded-3xl p-1 mt-4 w-full text-white capitalize hover:bg-red-700"
                    onClick={handleNewQuestion}
                  >
                    Finalizar pregunta
                  </button>
                </>
              )
            ) : (
              <p className="text-xl uppercase font-bold ">
                Votacion no iniciada
              </p>
            )}
          </article>
        </section>
      </section>
    </div>
  );
}

export default Residence;
