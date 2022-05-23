import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../Context/AuthContext";
import { HOME_ROUTE } from "../Constans/Routes";

function ProtectedRoute({ children }) {
  const { sessionUser, loading } = useAuth();
  if (loading) return <h1>cargando</h1>;
  if (!sessionUser) return <Navigate to={HOME_ROUTE} />;
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
