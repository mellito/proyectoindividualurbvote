import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateBase from "../../components/TemplateBase";
import RedirecTemplate from "../../components/RedirecTemplate";
import {
  REGISTER_ROUTE,
  HOME_ROUTE,
  VOTE,
} from "../../components/Constans/Routes";
import useSweetAlert from "../../utils/useSweetAlert";
import { checkVoteHouse } from "../../utils/fireStore";

function VoteLobby() {
  const [user, setUser] = useState({
    house: "",
    code: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!user.code) {
        return useSweetAlert("error", "codigo no puede estar vacio", "error");
      }
      const voteInformation = await checkVoteHouse(user.code);
      if (voteInformation) {
        const { houseVoteActive } = voteInformation;

        if (!Object.keys(houseVoteActive).includes(user.house)) {
          return useSweetAlert(
            "error",
            "casa no esta registrada para votar",
            "error",
          );
        }
        if (!(houseVoteActive[user.house].password === user.password)) {
          return useSweetAlert("error", "contrasena errada", "error");
        }
        navigate(`${VOTE}/${user.code}/${user.house}`);
        return useSweetAlert(
          "bienvenido",
          "login exitoso ya puedes votar",
          "success",
        );
      }
      return null;
    } catch (error) {
      return useSweetAlert("error", error.message, "error");
    }
  };
  return (
    <TemplateBase>
      <article className="w-96 h-auto bg-inherit text-center ">
        <form onSubmit={handleSubmit}>
          <label htmlFor="code" className="font-bold">
            Codigo *
            <input
              className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
              type="text"
              name="code"
              placeholder="ingresa tu codigo"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="house" className="font-bold">
            Casa *
            <input
              className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
              type="text"
              name="house"
              id="house"
              placeholder="min 6 caracteres"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="password" className="font-bold">
            Contrasena *
            <input
              className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
              type="password"
              name="password"
              id="password"
              placeholder="min 6 caracteres"
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="text-center bg-blue-900  rounded-3xl p-2 block mb-4 w-full text-white capitalize hover:bg-blue-700 "
          >
            Votar
          </button>
        </form>

        <RedirecTemplate
          nameLink="Crear una cuenta"
          nameContent="No te has registrado?"
          goLink={REGISTER_ROUTE}
        />
        <RedirecTemplate
          nameLink="Iniciar sesi??n"
          nameContent="Ya tienes una cuenta?"
          goLink={HOME_ROUTE}
        />
      </article>
    </TemplateBase>
  );
}

export default VoteLobby;
