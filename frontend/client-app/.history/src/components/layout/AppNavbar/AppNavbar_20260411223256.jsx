// import logo from '../../../assets/logo.png'
import styles from "./AppNavbar.module.css";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../../assets/logo.png"
function AppNavbar({ isLoggedIn = false }) {
  return (
     <Navbar expand="lg" className="">
      <Container fluid className="px-5">
        <Navbar.Brand as={}>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Create a team</Nav.Link>
            <Nav.Link href="#">Recommended Teams</Nav.Link>
            <Nav.Link href="#">Join a team</Nav.Link>
            <Nav.Link href="#">Explore Hackathons</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default AppNavbar;
