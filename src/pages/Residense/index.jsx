import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarNavegation from "../../components/SideBarNavegation";
import { useAuth } from "../../components/Context/AuthContext";
import UrbanizationCard from "../../components/UrbanizationCard";
import CardResidence from "../../components/CardResidence";

function Residence() {
  const [question, setQuestion] = useState("");
  const [infoResidence, setInfoResidence] = useState();
  const [houseArray, setHouseArray] = useState();
  const [houseData, sethouseData] = useState({
    cc: "",
    name: "",
    housenumber: "",
    phone: "",
    votacion: false,
    password: "",
  });

  const [voteCode, setVoteCode] = useState("");
  const {
    geOnetUrbanization,
    addHouse,
    useSweetAlert,
    realtimeCollectionCheck,
    createVote,
  } = useAuth();
  const id = useParams();
  const oneResidence = async () => {
    setInfoResidence(await geOnetUrbanization(id));
    await realtimeCollectionCheck(id, setHouseArray);
    if (localStorage.code) {
      setVoteCode(localStorage.getItem("code"));
    }
  };

  useEffect(() => {
    oneResidence();
  }, []);

  useEffect(() => {}, []);

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
          { houseVoteActive, questions: {} },
          resultCode.join(""),
          id.id,
        );
      }
    } catch (error) {
      useSweetAlert("error", error.message, "error");
    }
  };

  const endVote = () => {
    localStorage.removeItem("code");
    setVoteCode("");
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    const newQuestion = { 0: { question, yes: [], not: [], state: true } };
    console.log(newQuestion);
  };
  return (
    <div className="flex gap-1  ">
      <SideBarNavegation />
      <section className="h-screen grid grid-cols-3 ">
        <div className=" h-screen flex flex-col justify-evenly items-center overflow-y-auto">
          {infoResidence && (
            <UrbanizationCard urbanizationData={infoResidence} />
          )}
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
          <section className="grid grid-cols-3 gap-4 mb-4 ">
            {houseArray &&
              Object.values(houseArray.house).map((house) => (
                <CardResidence house={house} />
              ))}
          </section>
          {voteCode && (
            <>
              <p className="text-center mb-2 font-bold uppercase">
                votacion iniciada
              </p>
              <h3 className="text-center mb-2 font-bold">
                <p>https://urbvote.vercel.app/vote/</p>
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
            onClick={endVote}
            disabled={!voteCode}
          >
            terminar votacion
          </button>
        </div>
        <section className="font-bold items-center text-center  h-screen p-4">
          <article>
            <p className="uppercase " />
            {voteCode ? (
              <form onSubmit={handleSubmitQuestion}>
                <section className="flex flex-col justify-between item ">
                  <label htmlFor="email" className="font-bold mb-2">
                    PREGUNTA
                    <input
                      className="text-center border-2 border-gray-400 rounded-3xl  block  w-full bg-inherit"
                      type="text"
                      name="question"
                      placeholder="crear pregunta "
                      value={question}
                      onChange={(e) => {
                        setQuestion(e.target.value);
                      }}
                    />
                  </label>
                </section>

                <button
                  type="submit"
                  className="text-center bg-blue-900  rounded-3xl p-1  mb-4 w-full text-white capitalize hover:bg-blue-700"
                >
                  crear pregunta
                </button>
              </form>
            ) : (
              <p>votacion no iniciada</p>
            )}
          </article>
          <article>
            <p className="uppercase">Resultado</p>
          </article>
        </section>
      </section>
    </div>
  );
}

export default Residence;
