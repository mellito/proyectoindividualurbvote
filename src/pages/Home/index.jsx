import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";
import TemplateBase from "../../components/TemplateBase";
import {
  REGISTER_ROUTE,
  LOBBY_ROUTE,
  RECOVERY_ROUTE,
  VOTE_LOBBY,
} from "../../components/Constans/Routes";
import RedirecTemplate from "../../components/RedirecTemplate";

function Home() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, useSweetAlert, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.email || !user.password) {
        return useSweetAlert(
          "Validacion de campos",
          "los campos no pueden estar vacios",
          "error",
        );
      }

      await login(user.email, user.password);
      useSweetAlert(
        "Validacion correcta",
        "login correcto bienvenido",
        "success",
      );
      setUser({
        email: "",
        password: "",
      });
      return navigate(LOBBY_ROUTE);
    } catch (error) {
      return useSweetAlert("error con firebase", error.message, "error");
    }
  };

  const handleLogin = async () => {
    try {
      await googleLogin();
      useSweetAlert(
        "Validacion correcta",
        "login correcto bienvenido",
        "success",
      );
      navigate(LOBBY_ROUTE);
    } catch (error) {
      useSweetAlert("Error Google", error.message, "error");
    }
  };

  return (
    <TemplateBase>
      <article className="w-96 h-auto bg-inherit text-center ">
        <h1 className="capitalize text-2xl font-bold mb-2">Iniciar sesión</h1>
        <p className="first-letter:uppercase text-gray-700 font-semibold  mb-8">
          unete disfruta de nuestro sistema
        </p>
        <button
          type="button"
          className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 hover:bg-gray-200 w-full"
          onClick={handleLogin}
        >
          <FcGoogle className="inline text-xl" />
          <span className="ml-1 font-bold"> Iniciar sesión con google</span>
        </button>
        {/* eslint-disable-next-line no-octal-escape */}
        <p className="before:content-['---------------------------'] after:content-['---------------------------'] text-sm text-gray-600 mb-4">
          O inicia sesión con correo
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="font-bold">
            Correo *
            <input
              className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
              type="email"
              name="email"
              placeholder="youremail@company.ltd"
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
            Iniciar sesión
          </button>
        </form>

        <Link
          to={RECOVERY_ROUTE}
          className="block text-sm text-blue-900 font-semibold mb-4"
        >
          olvidaste la contrasena?
        </Link>

        <RedirecTemplate
          nameLink="Crear una cuenta"
          nameContent="No te has registrado?"
          goLink={REGISTER_ROUTE}
        />
        <Link
          to={VOTE_LOBBY}
          className="block  text-blue-900 font-semibold mt-4 text-3xl capitalize"
        >
          votar aqui
        </Link>
      </article>
    </TemplateBase>
  );
}

export default Home;
