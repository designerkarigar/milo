import React from "react";
import { Navigate } from "react-router-dom";

import {
  GetValueInLocalStorage,
  key,
} from "../utils/Functions/Others/Setter_GetterLocalStorage";

const ProtectedRoute = ({ component: Component, path, access, ...props }) => {
  const value = GetValueInLocalStorage(key);

  if (access === "allow") {
    return value ? <Navigate to="/dashboard" /> : <Component />;
  } else {
    return value ? <Component /> : <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
