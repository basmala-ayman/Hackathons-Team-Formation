// import logo from '../../../assets/logo.png'
import styles from "./AppNavbar.module.css";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../../assets/logo.png"
function AppNavbar({ isLoggedIn = false }) {
  return (
     <Navbar expand="lg" className="">
      <Container fluid className="px-5">
        <Navbar.Brand as={Link}to='/'>
        <img src={logo} alt="Team Catalyst Logo" height="40"/>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-4 align-items-center">
            <Nav.Link as={Link} to='/' className="text-dark">Create a team</Nav.Link>
            <Nav.Link as={Link} to='/' className="text-dark">Recommended Teams</Nav.Link>
            <Nav.Link as={Link} to='/' className="text-dark">Join a team</Nav.Link>
            <Nav.Link as={Link} to='/' className="text-dark">Explore Hackathons</Nav.Link>
            
            <div className="d-flex mt-4"></div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default AppNavbar;
