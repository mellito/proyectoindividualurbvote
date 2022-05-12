import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HOME_ROUTE, REGISTER_ROUTE, LOBBY_ROUTE } from "../Constans/Routes";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Lobby from "../../pages/Lobby";
import ProtectedRoute from "../ProtectedRoute";

function MainRoute() {
  return (
    <div className="bg-gray-300 h-screen">
      <BrowserRouter>
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
          <Route
            path={LOBBY_ROUTE}
            element={
              <ProtectedRoute>
                <Lobby />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MainRoute;
