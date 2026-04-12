// import logo from '../../../assets/logo.png'
import styles from "./AppNavbar.module.css";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../../assets/logo.png"
import UserAuthenticatedMenu from "./UserAuthenticatedMenu";
import GuestAuthButtons from "./GuestAuthButtons";
function AppNavbar({ isLoggedIn = false }) {
  return (
     <Navbar expand="lg" className={`${styles.navbar}`}>
      <Container  className="">
        <Navbar.Brand as={Link}to='/'>
        <img src={logo} alt="Team Catalyst Logo" height="100"/>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-5 align-items-center">
            <Nav.Link as={Link} to='/' className={`text-dark ${styles.navlinks}`}>Create a team</Nav.Link>
            <Nav.Link as={Link} to='/' className={`text-dark ${styles.navlinks}`}>Recommended Teams</Nav.Link>
            <Nav.Link as={Link} to='/' className={`text-dark ${styles.navlinks}`}>Join a team</Nav.Link>
            <Nav.Link as={Link} to='/' className={`text-dark ${styles.navlinks}`}>Explore Hackathons</Nav.Link>
            
          </Nav>
            <div className="">
              {isLoggedIn? <UserAuthenticatedMenu/> : <GuestAuthButtons/>}
            </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default AppNavbar;
