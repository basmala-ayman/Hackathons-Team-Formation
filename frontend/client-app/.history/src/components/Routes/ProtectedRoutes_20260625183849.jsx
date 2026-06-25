import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";
function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();
  if(loading)

  return <div></div>;
}

export default ProtectedRoutes;
