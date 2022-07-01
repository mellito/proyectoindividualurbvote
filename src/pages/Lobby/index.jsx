import { useState, useEffect } from "react";
import SideBarNavegation from "../../components/SideBarNavegation";
import { useAuth } from "../../components/Context/AuthContext";
import UrbanizationCard from "../../components/UrbanizationCard";
import { getAllUrbanization } from "../../utils/fireStore";

function Lobby() {
  const { sessionUser } = useAuth();
  const [listUrbData, setListUrbData] = useState();
  const getAllUrbList = async () => {
    setListUrbData(await getAllUrbanization(sessionUser));
  };

  useEffect(() => {
    getAllUrbList();
  }, []);

  return (
    <div className="flex ">
      <SideBarNavegation />

      <div className="h-screen w-full flex flex-col items-center overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-4 mt-4">
          UNIDADES RESIDENCIALES
        </h1>
        <div className="grid grid-cols-4 p-6 gap-6 ">
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
    </div>
  );
}

export default Lobby;
