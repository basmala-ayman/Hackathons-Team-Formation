import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import MainLayout from "./components/layout/MainLayout/MainLayout.jsx";
import { ProtectedRoute , AdminRoute } from "./components/Routes/ProtectedRoutes.jsx";

import Home from './Pages/Home/Home'
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import ForgetPassword from "./components/auth/ForgetPassword/ForgetPassword";
import ResetPassword from './components/auth/Resetpassword/ResetPassword';
import EmailSent from "./components/auth/EmailSent/EmailSent";
import VerifyEmail from './components/auth/VerifyEmail/VerifyEmail';


import NoticationsPage from "./Pages/NotificationPage/NotificationsPage"
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Explore from "./Pages/Explore/Explore";
import UserDashboard from './Pages/UserDashboard/UserDashboard.jsx';
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";
import CreateTeam from "./Pages/CreateTeam/CreateTeam"
import RecommendedTeams from "./Pages/RecommendedTeams/RecommendedTeams";
import DiscoverProjects from "./Pages/DiscoverProjects/DiscoverProjects";
function App() {
 
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          //  ensures the popup toaster is always on top of other elements
          style: { zIndex: 99999 , fontSize:"1.6rem" },
        }}
      />
          <Routes>
            {/* Admin Routes */}
            <Route element={AdminRoute}>
              <Route path="/admin-dashboard"/>

            </Route>
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
            <Route path="/explore-Projects" element={<DiscoverProjects />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/userprofile" element={<UserProfile isOwner={true} />} />
            <Route path="/profile" element={<UserProfile isOwner={false} />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
