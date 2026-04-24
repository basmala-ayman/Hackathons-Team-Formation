import "./App.css";
import AppNavbar from "./components/layout/AppNavbar/AppNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Home from './Pages/Home/Home'
import Register from "./components/auth/Register/Register";
import ForgetPassword from "./components/auth/ForgetPassword/ForgetPassword";
import EmailSent from "./components/auth/EmailSent/EmailSent";
import NoticationsPage from "./Pages/NotificationPage/NotificationsPage"
import CreateTeam
// import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Footer from "./components/layout/Footer/Footer";
import Explore from "./Pages/Explore/Explore";
import { useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(true);
  const handleLogOut=()=>{
    setIsLoggedIn(false);
  }
  return (
    <BrowserRouter>
    <div className="min-vh-100 d-flex flex-column">
    <AppNavbar isLoggedIn={isLoggedIn} onLogout={handleLogOut}/>

    <main className="flex-grow-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/emailsent" element={<EmailSent />} />
        <Route path="/notifications" element={<NoticationsPage />} />
        {/* <Route path="/admindashboard" element={<AdminDashboard />} /> */}
        <Route path="/explore" element={<Explore />} />

      </Routes>
      </main>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
