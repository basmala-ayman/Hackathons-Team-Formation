
import './App.css'
import AppNavbar from './components/layout/AppNavbar/AppNavbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import ForgetPassword from "./components/auth/ForgetPassword/ForgetPassword";
import EmailSent from "./components/auth/EmailSent/EmailSent";
import Footer from './components/layout/Footer/Footer';
function App() {
  return (
    <>
    <BrowserRouter>
    <AppNavbar isLoggedIn={false}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/emailsent" element={<EmailSent />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
