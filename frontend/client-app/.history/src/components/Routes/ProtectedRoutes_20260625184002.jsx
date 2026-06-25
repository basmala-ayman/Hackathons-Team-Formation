import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";
import { LoadingState } from "../../shared/States";
function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();
  if(loading) return(
<LoadingState message="Loda"></LoadingState>
  )

  return <div></div>;
}

export default ProtectedRoutes;
