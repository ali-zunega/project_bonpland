import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth.jsx";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PublicRoute;