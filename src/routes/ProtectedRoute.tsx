import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { isLogin } from "../utils/isLogin";

const ProtectedRoute = ({ children }: { children: any }) => {
  const location = useLocation();

  if (!isLogin()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
