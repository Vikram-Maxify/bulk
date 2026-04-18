import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // agar user login nahi hai → home pe bhej do
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;