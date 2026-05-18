import "./App.css";
import AppNavbar from "./components/layout/AppNavbar/AppNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Home from './Pages/Home/Home'
import Register from "./components/auth/Register/Register";
import ForgetPassword from "./components/auth/ForgetPassword/ForgetPassword";
import EmailSent from "./components/auth/EmailSent/EmailSent";
import NoticationsPage from "./Pages/NotificationPage/NotificationsPage"
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Footer from "./components/layout/Footer/Footer";
import Explore from "./Pages/Explore/Explore";
// import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/AuthContext/useAuth.js";
import VerifyEmail from './components/auth/VerifyEmail/VerifyEmail';
import UserDashboard from './Pages/UserDashboard/UserDashboard.jsx';
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";
function App() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          //  ensures the popup toaster is always on top of other elements
          style: { zIndex: 99999 },
        }}
      />
      <div className="min-vh-100 d-flex flex-column">
        <AppNavbar isLoggedIn={isAuthenticated} onLogout={logout} />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/emailsent" element={<EmailSent />} />
            <Route path="/notifications" element={<NoticationsPage />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
