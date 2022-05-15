import { useState, useEffect } from "react";
import SideBarNavegation from "../../components/SideBarNavegation";
import { useAuth } from "../../components/Context/AuthContext";
import UrbanizationCard from "../../components/UrbanizationCard";

function Lobby() {
  const { getAllUrbanization } = useAuth();
  const [listUrbData, setListUrbData] = useState();
  const getAllUrbList = async () => {
    setListUrbData(await getAllUrbanization());
  };

  useEffect(() => {
    getAllUrbList();
  }, []);

  return (
    <div className="flex ">
      <SideBarNavegation />
      <div className="h-screen w-full flex justify-center items-center">
        <h1>UNIDADES RESIDENCIALES</h1>

        {listUrbData ? (
          listUrbData.map((list) => (
            <UrbanizationCard
              urbanizationData={list}
              key={list.identification}
            />
          ))
        ) : (
          <h1>Cargando</h1>
        )}
      </div>
    </div>
  );
}

export default Lobby;
