import jwtDecode from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../Utilities/getToken";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
};

function useAuth() {
  const token = getToken();
  if (token) {
    const { exp } = jwtDecode(token);
    return exp * 1000 < Date.now() ? false : true;
  } else {
    return false;
  }
}

export default PrivateRoute;
