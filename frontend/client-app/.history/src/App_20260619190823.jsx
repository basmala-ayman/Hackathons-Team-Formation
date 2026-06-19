import "./App.css";
import AppNavbar from "./components/layout/AppNavbar/AppNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Home from './Pages/Home/Home'
import Register from "./components/auth/Register/Register";
import ForgetPassword from "./components/auth/ForgetPassword/ForgetPassword";
import ResetPassword from './components/auth/Resetpassword/ResetPassword';
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
import CreateTeam from "./Pages/CreateTeam/CreateTeam"
import RecommendedTeams from "./Pages/RecommendedTeams/RecommendedTeams";
import TeamProfile from "./Pages/RecommendedTeams/TeamProfile/TeamProfile";
import DiscoverProjects from "./Pages/DiscoverProjects/DiscoverProjects";
function App() {
  const { isAuthenticated, logout } = useAuth();
  // const externalUserData = {
  //   name: "Sarah T.",
  //   username: "@SarahT",
  //   bio: "UI/UX Designer...",
  //   technicalSkills: ["Figma", "React"],
  //   softSkills: ["Problem Solving"],
  //   interests: ["Product Design"],
  //   location: "Egypt, Giza",
  //   email: "omarhaitham@gmail.com",
  //   website: "omarhaitham.dev",
  //   joinedDate: "Joined Oct 2026",
  //   linkedin: "",
  //   github: ""
  // };
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          //  ensures the popup toaster is always on top of other elements
          style: { zIndex: 99999 , fontSize:"2rem" },
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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/notifications" element={<NoticationsPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/explore-Hackathons" element={<Explore />} />
            <Route path="/create-Team" element={<CreateTeam />} />
            <Route path="/recommended-Teams" element={<RecommendedTeams />} />
            <Route path="/teams/:id" element={<TeamProfile />} />
            <Route path="/explore-Projects" element={<DiscoverProjects />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/userprofile" element={<UserProfile isOwner={true} />} />
            <Route path="/profile" element={<UserProfile isOwner={false} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
