import {Container, Nav,Navbar } from 'react-bootstrap';
// import logo from '../../../assets/logo.png'
import styles from "./AppNavbar.module.css";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import logo from "../../../assets/logo.png";
import UserAuthenticatedMenu from "./UserAuthenticatedMenu";
import GuestAuthButtons from "./GuestAuthButtons";
function AppNavbar({ isLoggedIn = false }) {
  return (
    <Navbar expand="lg" className='navbar bg-white sticky="top" '>
   
    </Navbar>
  );
}

export default AppNavbar;
