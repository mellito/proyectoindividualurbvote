import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER_ROUTE, HOME_ROUTE } from "../../components/Constans/Routes";
import TemplateBase from "../../components/TemplateBase";
import RedirecTemplate from "../../components/RedirecTemplate";
import useSweetAlert from "../../utils/useSweetAlert";
import { resetPassword } from "../../utils/auth";

function Recovery() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState();

  const handleResetPassword = async () => {
    if (!userEmail) {
      return useSweetAlert(
        "Validacion campos",
        "debes digitar un correo",
        "error",
      );
    }

    await resetPassword(userEmail);
    useSweetAlert(
      "Recuperacion exitosa",
      "se ha enviado un correo porfavor verifica tu bandeja o span ",
      "success",
    );
    return navigate(HOME_ROUTE);
  };
  return (
    <TemplateBase>
      <div className="text-center">
        <h1 className="capitalize text-2xl font-bold mb-2">
          Recuperar contrasena
        </h1>
        <p className="first-letter:uppercase text-gray-700 font-semibold  mb-4">
          Ingresa el correo con el que te registraste
        </p>
        <input
          className="text-center border-2 border-gray-400 rounded-3xl p-2 block mb-4 w-full bg-inherit"
          type="email"
          name="email"
          placeholder="youremail@company.ltd"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button
          type="button"
          className="text-center bg-blue-900  rounded-3xl p-2 block mb-4 w-full text-white capitalize hover:bg-blue-700"
          onClick={handleResetPassword}
        >
          RECUPERAR
        </button>

        <RedirecTemplate
          nameLink="Crear una cuenta"
          nameContent="No te has registrado?"
          goLink={REGISTER_ROUTE}
        />
        <RedirecTemplate
          nameLink="Iniciar sesión"
          nameContent="Ya tienes una cuenta?"
          goLink={HOME_ROUTE}
        />
      </div>
    </TemplateBase>
  );
}

export default Recovery;
