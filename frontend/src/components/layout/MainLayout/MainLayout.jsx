import { Outlet } from "react-router-dom";
import AppNavbar from "../AppNavbar/AppNavbar";
import Footer from "../Footer/Footer";
import { useAuth } from "../../../context/AuthContext/useAuth";
function MainLayout() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppNavbar isLoggedIn={isAuthenticated} onLogout={logout} />
      <main className="flex-grow-1">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}

export default MainLayout;
