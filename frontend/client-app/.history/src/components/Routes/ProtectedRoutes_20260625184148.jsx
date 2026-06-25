import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";
import { LoadingState } from "../../shared/States";
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingState />;
  //if not logged in return to home
  return isAuthenticated?<Outlet/>:<Navigate to="/" replace/>;
}

export const AdminRoute=()=>

