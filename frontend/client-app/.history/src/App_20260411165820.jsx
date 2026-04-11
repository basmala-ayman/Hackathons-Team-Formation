<<<<<<< HEAD
import './App.css'
import AppNavbar from './components/layout/AppNavbar/AppNavbar'
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import ForgetPassword from "./components/auth/ForgetPassword/ForgetPassword";
import EmailSent from "./components/auth/EmailSent/EmailSent";

>>>>>>> 9cf702b6e1dac942128da297367c48544275de8c
function App() {
  return (
<<<<<<< HEAD
    <>
     <CustomButton variant={"primary"}>Zeina</CustomButton>
    </>
  )
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/emailsent" element={<EmailSent />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> 9cf702b6e1dac942128da297367c48544275de8c
}

export default App;
