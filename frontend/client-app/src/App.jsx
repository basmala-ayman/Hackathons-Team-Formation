import "./App.css";
import AppNavbar from "./components/layout/AppNavbar/AppNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import ForgetPassword from "./components/auth/ForgetPassword/ForgetPassword";
import EmailSent from "./components/auth/EmailSent/EmailSent";
import NoticationsPage from "./Pages/NotificationPage/NotificationsPage"
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/emailsent" element={<EmailSent />} />
        <Route path="/notifications" element={<NoticationsPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
