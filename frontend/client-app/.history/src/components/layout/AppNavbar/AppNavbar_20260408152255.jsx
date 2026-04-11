import {Container, Nav,Navbar } from 'react-bootstrap';
import logo from '../../../assets/logo.png'
import "./AppNavbar.module.css";

function AppNavbar() {
  return (
    <Navbar expand="lg" className='navbar'>
      <Container>
        <Navbar.Brand href="#"> <img src={logo} alt="Logo" /></Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
    </Container>
    </Navbar>
  );
  
}

export default AppNavbar;
