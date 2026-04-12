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
            <Nav.Link as={Link} to='/'>Create a team</Nav.Link>
            <Nav.Link as={Link} to='/'>Recommended Teams</Nav.Link>
            <Nav.Link href="#">Join a team</Nav.Link>
            <Nav.Link href="#">Explore Hackathons</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default AppNavbar;
