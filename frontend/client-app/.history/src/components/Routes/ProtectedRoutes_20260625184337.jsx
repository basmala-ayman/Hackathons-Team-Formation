import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";
import { LoadingState } from "../../shared/States";

//normal users
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingState />;
  //if not logged in return to home
  return isAuthenticated?<Outlet/>:<Navigate to="/" replace/>;
}

//admin only
export const AdminRoute=()=>{
    const {user , isAuthenticated , loading}=useAuth();
    if(loading) return <LoadingState/>
    const isAdmin=isAuthenticated && user?.email==="team.catalyst26@gmail.com"

    return isAdmin? <Outlet/>:<Navigate to="/" replace></Navigate>
}

