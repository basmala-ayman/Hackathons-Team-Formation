import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";
import { LoadingState } from "../../shared/States";
function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();
  if(loading) return(

  )

  return <div></div>;
}

export default ProtectedRoutes;
