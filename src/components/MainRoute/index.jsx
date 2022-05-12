import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HOME_ROUTE, REGISTER_ROUTE } from "../Constans/Routes";
import Home from "../../pages/Home";
import Register from "../../pages/Register";

function MainRoute() {
  return (
    <div className="bg-gray-300 h-screen">
      <BrowserRouter>
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MainRoute;
