import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  HOME_ROUTE,
  REGISTER_ROUTE,
  LOBBY_ROUTE,
  RECOVERY_ROUTE,
  CREATE_RESIDENCE,
} from "../Constans/Routes";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Recovery from "../../pages/Recovery";
import Lobby from "../../pages/Lobby";
import ProtectedRoute from "../ProtectedRoute";
import NewResidence from "../../pages/NewResidence";

function MainRoute() {
  return (
    <div className="bg-gray-300 h-screen">
      <BrowserRouter>
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
          <Route path={RECOVERY_ROUTE} element={<Recovery />} />
          <Route
            path={LOBBY_ROUTE}
            element={
              <ProtectedRoute>
                <Lobby />
              </ProtectedRoute>
            }
          />
          <Route
            path={CREATE_RESIDENCE}
            element={
              <ProtectedRoute>
                <NewResidence />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MainRoute;