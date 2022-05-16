import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBarNavegation from "../../components/SideBarNavegation";
import { useAuth } from "../../components/Context/AuthContext";
import UrbanizationCard from "../../components/UrbanizationCard";

function Residence() {
  const [infoResidence, setInfoResidence] = useState();
  const [houseData, sethouseData] = useState({
    cc: "",
    name: "",
    housenumber: "",
    phone: "",
    votacion: false,
  });
  const { geOnetUrbanization, addHouse, useSweetAlert } = useAuth();
  const id = useParams();
  const oneResidence = async () => {
    const result = await geOnetUrbanization(id);
    setInfoResidence(result);
  };

  useEffect(() => {
    oneResidence();
  }, []);

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
    });
    return useSweetAlert(
      "Exitodso",
      `casa ${houseData.housenumber} creada`,
      "success",
    );
  };

  return (
    <div className="flex gap-1 ">
      <SideBarNavegation />
      <section className="h-screen w-full  overflow-scroll">
        <div className="w-60 h-screen flex flex-col justify-evenly">
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
                    className="text-center border-2 border-gray-400 rounded-3xl  block  w-full bg-inherit  mb-4"
                    type="number"
                    name="phone"
                    placeholder="0000000"
                    value={houseData.phone}
                    onChange={handleChange}
                  />
                </label>
              </section>

              <button
                type="submit"
                className="text-center bg-blue-900  rounded-3xl p-1 block mb-4 w-full text-white capitalize hover:bg-blue-700"
              >
                crear
              </button>
            </form>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Residence;
