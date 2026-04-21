import "./App.css";
import AppNavbar from "./components/layout/AppNavbar/AppNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Home from './Pages/Home/Home'
import Register from "./components/auth/Register/Register";
import ForgetPassword from "./components/auth/ForgetPassword/ForgetPassword";
import EmailSent from "./components/auth/EmailSent/EmailSent";
import Footer from "./components/layout/Footer/Footer";
import Explore from "./Pages/Explore/Explore";
function App() {
  []
  return (
    <BrowserRouter>
    <div className="min-vh-100 d-flex flex-column">
    <AppNavbar isLoggedIn={true}/>

    <main className="flex-grow-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/emailsent" element={<EmailSent />} />
        <Route path="/explore" element={<Explore />} />

      </Routes>
      </main>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
