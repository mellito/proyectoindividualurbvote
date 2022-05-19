import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarNavegation from "../../components/SideBarNavegation";
import { useAuth } from "../../components/Context/AuthContext";
import UrbanizationCard from "../../components/UrbanizationCard";
import CardResidence from "../../components/CardResidence";

function Residence() {
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
      const objectToArrayHouse = Object.values(houseArray.house);
      const filterHouseArray = objectToArrayHouse.filter(
        (house) => house.votacion === true,
      );
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
          { houseactive: filterHouseArray },
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
  return (
    <div className="flex gap-1 ">
      <SideBarNavegation />
      <section className="h-screen  flex  justify-evenly items-center ">
        <div className="w-full h-screen flex flex-col justify-evenly items-center">
          {infoResidence && (
            <UrbanizationCard urbanizationData={infoResidence} />
          )}
          <article className="text-center ">
            <h1 className="uppercase font-bold">Crear casa</h1>
            <form onSubmit={handleSubmit}>
              <section className="flex flex-col justify-between">
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
                    className="text-center border-2 border-gray-400 rounded-3xl  block  w-full bg-inherit  mb-4"
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
      </section>
      <div className="h-screen overflow-y-scroll p-4">
        <h1 className="uppercase font-bold mb-4 text-center">
          casas registradas
        </h1>
        <section className="grid grid-cols-2 gap-2 mb-4">
          {houseArray &&
            Object.values(houseArray.house).map((house) => (
              <CardResidence house={house} />
            ))}
        </section>
        {voteCode && (
          <>
            <p className="text-center mb-2 font-bold uppercase">
              {" "}
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
      <section className="font-bold">
        <article>
          <p className="uppercase">Pregunta actual</p>
          {voteCode ? <p>Pregunta actual</p> : <p>votacion no iniciada</p>}
        </article>
        <article>
          <p className="uppercase">Resultado</p>
        </article>
      </section>
    </div>
  );
}

export default Residence;
