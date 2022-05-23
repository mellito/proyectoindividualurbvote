import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  HOME_ROUTE,
  REGISTER_ROUTE,
  LOBBY_ROUTE,
  RECOVERY_ROUTE,
  CREATE_RESIDENCE,
  RESIDENCE,
  VOTE_LOBBY,
  VOTE,
} from "../Constans/Routes";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Recovery from "../../pages/Recovery";
import Lobby from "../../pages/Lobby";
import ProtectedRoute from "../ProtectedRoute";
import NewResidence from "../../pages/NewResidence";
import Residence from "../../pages/Residense";
import VoteLobby from "../../pages/VoteLobby";
import Vote from "../../pages/Vote";

function MainRoute() {
  return (
    <div className="bg-gray-300 h-screen">
      <BrowserRouter>
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
          <Route path={RECOVERY_ROUTE} element={<Recovery />} />
          <Route path={VOTE_LOBBY} element={<VoteLobby />} />
          <Route path={`${VOTE}/:code/:house`} element={<Vote />} />
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
          <Route
            path={`${RESIDENCE}/:id`}
            element={
              <ProtectedRoute>
                <Residence />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MainRoute;
