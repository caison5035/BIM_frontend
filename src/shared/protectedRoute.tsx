import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "./authContext";

const ProtectedRoute = ({ children, accessBy }: any) => {
  const { user } = useContext(AuthContext);

  if (accessBy === "non-authenticated" || accessBy === "") {
    if (!user) {
      return children;
    }
  } else if (accessBy === "authenticated") {
    if (user) {
      return children;
    }
  }

  return <Navigate to="/"></Navigate>;
};

export default ProtectedRoute;
