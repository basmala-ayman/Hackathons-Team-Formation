import { Outlet } from "react-router-dom"
import AppNavbar from "../AppNavbar/AppNavbar"
import Footer from "../Footer/Footer"
import { useAuth } from "../../../context/AuthContext/useAuth"
function MainLayout() {
    const {isA} =useAuth();
  return (
    <div>
      
    </div>
  )
}

export default MainLayout
