import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";
import TemplateBase from "../../components/TemplateBase";
import { HOME_ROUTE } from "../../components/Constans/Routes";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signup, useSweetAlert } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.password !== user.confirmpassword) {
        useSweetAlert(
          "error con contrasena",
          "contrasena no son iguales",
          "error",
        );
      } else {
        await signup(user.email, user.password);
      }
    } catch (error) {
      useSweetAlert("error con firebase", error.message, "error");
    }
  };
  return (
    <TemplateBase>
      <article className="w-96 h-auto bg-inherit text-center ">
        <h1 className="capitalize text-2xl font-bold mb-2">Registrate</h1>
        <p className="first-letter:uppercase text-gray-700 font-semibold  mb-8">
          unete disfruta de nuestro sistema
        </p>
        <a
          href="#!"
          className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4"
        >
          <FcGoogle className="inline" />
          <span className="ml-1"> Registrate con google</span>
        </a>
        {/* eslint-disable-next-line no-octal-escape */}
        <p className="before:content-['---------------------------'] after:content-['---------------------------'] text-sm text-gray-600 mb-4">
          O registrate con correo
        </p>
        <form onSubmit={handleSubmit} className="mb-8">
          <label htmlFor="email">
            Correo *
            <input
              className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
              type="email"
              name="email"
              placeholder="youremail@company.ltd"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="password">
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

          <label htmlFor="confirmpassword">
            Confirmar contrasena *
            <input
              className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="min 6 caracteres"
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="text-center bg-blue-900  rounded-3xl p-2 block mb-4 w-full text-white capitalize "
          >
            Registrate
          </button>
        </form>
        <div className="text-sm">
          <span className="font-semibold"> Ya tienes una cuenta? </span>
          <Link
            to={HOME_ROUTE}
            className="text-sm text-blue-900 font-semibold mb-4"
          >
            Iniciar sesión
          </Link>
        </div>
      </article>
    </TemplateBase>
  );
}

export default Register;
