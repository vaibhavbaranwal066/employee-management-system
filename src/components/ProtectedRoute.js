import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedIn = localStorage.getItem("ems_logged_in");

  return loggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
