import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { CREATE_RESIDENCE, LOBBY_ROUTE } from "../Constans/Routes";
import { logOut } from "../../utils/auth";
import useSweetAlert from "../../utils/useSweetAlert";

function SideBarNavegation() {
  const { sessionUser } = useAuth();
  const { displayName, photoURL } = sessionUser;

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      useSweetAlert("Error Google", error.message, "error");
    }
  };
  return (
    <nav className="bg-blue-700 text-white h-screen w-60 flex flex-col justify-between items-center py-4">
      <h1 className="uppercase">Panel UrbVote</h1>

      <section className="text-center uppercase">
        <Link
          to={LOBBY_ROUTE}
          className=" hover:text-gray-400 font-bold block mb-4"
        >
          inicio
        </Link>
        <Link
          to={CREATE_RESIDENCE}
          className=" hover:text-gray-400 font-bold block mb-4"
        >
          Crear unidad
        </Link>
      </section>

      <section className="flex flex-col justify-between items-center h-52 uppercase">
        <p className="capitalize"> {displayName}</p>
        <img
          src={photoURL}
          alt={displayName}
          className="object-contain w-5/6 h-3/5 "
        />
        <button
          type="button"
          onClick={handleLogOut}
          className="   hover:text-gray-400 uppercase  font-semibold"
        >
          Cerrar sesion
        </button>
      </section>
    </nav>
  );
}

export default SideBarNavegation;
