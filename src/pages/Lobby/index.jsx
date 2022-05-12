// import { useEffect } from "react";
import { useAuth } from "../../components/Context/AuthContext";

function Lobby() {
  const { sessionUser, logOut, useSweetAlert } = useAuth();

  //   const updateAdmin = async () => {
  //     await updateUser();
  //   };
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      useSweetAlert("Error Google", error.message, "error");
    }
  };

  //   useEffect(() => {
  //     if (sessionUser.displayName === null) {
  //       updateAdmin();
  //     }
  //   }, []);
  return (
    <div>
      <h1>Bienvenido:{sessionUser.email}</h1>
      <p> nombre: {sessionUser.displayName}</p>
      <img src={sessionUser.photoURL} alt={sessionUser.displayName} />
      <button type="button" onClick={handleLogOut}>
        Cerrar sesion
      </button>
    </div>
  );
}

export default Lobby;
