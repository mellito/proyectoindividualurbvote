import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateBase from "../../components/TemplateBase";
import { HOME_ROUTE } from "../../components/Constans/Routes";
import RedirecTemplate from "../../components/RedirecTemplate";
import useSweetAlert from "../../utils/useSweetAlert";
import { signUp, updateUser } from "../../utils/auth";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.password || !user.confirmpassword || !user.email) {
        return useSweetAlert(
          "Validacion de campos",
          "Ningun campo puede estar vacio",
          "error",
        );
      }
      if (user.password !== user.confirmpassword) {
        return useSweetAlert(
          "error con contrasena",
          "contrasena no son iguales",
          "error",
        );
      }
      await signUp(user.email, user.password);
      await updateUser();
      useSweetAlert(
        "Login exitoso",
        "Bienvenido esperamos que tengas una buena experiencia",
        "success",
      );

      setUser({
        email: "",
        password: "",
      });
      return navigate(HOME_ROUTE);
    } catch (error) {
      return useSweetAlert("error con firebase", error.message, "error");
    }
  };
  return (
    <TemplateBase>
      <article className="w-96 h-auto bg-inherit text-center ">
        <h1 className="capitalize text-2xl font-bold mb-2">Registrate</h1>
        <p className="first-letter:uppercase text-gray-700 font-semibold  mb-8">
          unete disfruta de nuestro sistema
        </p>

        <p className="before:content-['---------------------------'] after:content-['---------------------------'] text-sm text-gray-600 mb-4">
          Registrate con correo
        </p>
        <form onSubmit={handleSubmit} className="mb-8">
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

          <label htmlFor="confirmpassword" className="font-bold">
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
            className="text-center bg-blue-900  rounded-3xl p-2 block mb-4 w-full text-white capitalize hover:bg-blue-700 "
          >
            Registrate
          </button>
        </form>
        <RedirecTemplate
          nameLink="Iniciar sesión"
          nameContent="Ya tienes una cuenta?"
          goLink={HOME_ROUTE}
        />
      </article>
    </TemplateBase>
  );
}

export default Register;
