import { useState } from "react";
import SideBarNavegation from "../../components/SideBarNavegation";
import { useAuth } from "../../components/Context/AuthContext";

function NewResidence() {
  const { useSweetAlert, fileHandler, createUrbanization } = useAuth();
  const [urbanizationData, setUrbanizationData] = useState({
    uniName: "",
    address: "",
    identification: "",
    email: "",
    phone: "",
    photo: "",
  });

  const [storagePhotoEvent, setStoragePhotoEvent] = useState();

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setStoragePhotoEvent(e);
    }
    const { name, value } = e.target;
    setUrbanizationData({ ...urbanizationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !urbanizationData.uniName ||
      !urbanizationData.address ||
      !urbanizationData.identification ||
      !urbanizationData.email ||
      !urbanizationData.phone ||
      !urbanizationData.photo
    ) {
      return useSweetAlert(
        "Validacion de datos ",
        "ningundo de los datos puede estar vacio",
        "error",
      );
    }

    try {
      const photo = await fileHandler(
        storagePhotoEvent,
        urbanizationData.uniName,
      );
      const newUrbanization = { ...urbanizationData, photo, house: [] };
      setUrbanizationData({
        uniName: "",
        address: "",
        identification: "",
        email: "",
        phone: "",
        photo: "",
      });
      createUrbanization(newUrbanization);
      return useSweetAlert(
        "Creada",
        `urbanzacion ${newUrbanization.uniName} creada exitosamente`,
        "success",
      );
    } catch (error) {
      setUrbanizationData({});
      return useSweetAlert("Error Google", error.message, "error");
    }
  };
  return (
    <div className="flex">
      <SideBarNavegation />
      <div className="h-screen w-full flex justify-center items-center">
        <div className="text-center">
          <h1 className="mb-6 text-4xl">CREAR UNIDAD RESIDENCIAL</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <section className="flex flex-col justify-between">
              <label htmlFor="email" className="font-bold">
                Nombre *
                <input
                  className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
                  type="text"
                  name="uniName"
                  placeholder="urbanización"
                  value={urbanizationData.uniName}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="password" className="font-bold">
                Direccion *
                <input
                  className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
                  type="text"
                  name="address"
                  placeholder="avenida # -"
                  value={urbanizationData.address}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="password" className="font-bold">
                Nit *
                <input
                  className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
                  type="number"
                  name="identification"
                  placeholder="0000000"
                  value={urbanizationData.identification}
                  onChange={handleChange}
                />
              </label>
            </section>

            <section className="flex flex-col justify-between">
              <label htmlFor="email" className="font-bold">
                Correo *
                <input
                  className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
                  type="text"
                  name="email"
                  placeholder="youremail@company.ltd"
                  onChange={handleChange}
                  value={urbanizationData.email}
                />
              </label>

              <label htmlFor="password" className="font-bold">
                Telefono *
                <input
                  className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
                  type="number"
                  name="phone"
                  placeholder="634123456"
                  value={urbanizationData.phone}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="password" className="font-bold">
                foto *
                <input
                  className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
            </section>

            <button
              type="submit"
              className="text-center bg-blue-900  rounded-3xl p-2 block mb-4 w-full text-white capitalize hover:bg-blue-700 col-span-2 "
            >
              crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewResidence;
