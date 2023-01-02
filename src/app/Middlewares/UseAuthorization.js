import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoginState } from "../Features/UserAuthentication/LoginSlice";

const UseAuthorization = () => {
  const { token } = useSelector(LoginState);
  let location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default UseAuthorization;
