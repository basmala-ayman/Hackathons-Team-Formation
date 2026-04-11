import {Container, Nav,Navbar } from 'react-bootstrap';
import logo from '../../../assets/logo.png'
import "./AppNavbar.module.css";

function AppNavbar() {
  return (
    <Navbar expand="lg" className='navbar'>
      <Container>
        <Navbar.Brand href="#"> <img src="" alt="" /></Navbar.Brand>
    
    </Container>
    </Navbar>
  );
  
}

export default AppNavbar;
