// import logo from '../../../assets/logo.png'
import styles from "./AppNavbar.module.css";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import logo from "../../../assets/logo.png";
import UserAuthenticatedMenu from "./UserAuthenticatedMenu";
import GuestAuthButtons from "./GuestAuthButtons";
function AppNavbar({ isLoggedIn, onLogOut }) {
  return (
    <Navbar expand="xl" className={`${styles.navbar}`}>
      <Container className="">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Team Catalyst Logo" height="70" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler}/>
        <Navbar.Offcanvas
          id="basic-navbar-nav"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="mx-auto gap-lg-5 gap-sm-4 py-sm-5 py-lg-6 align-items-center">
              <Nav.Link
                as={Link}
                to="/"
                className={`text-dark text-nowrap ${styles.navlinks}`}
              >
                Create a team
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/"
                className={`text-dark text-nowrap ${styles.navlinks}`}
              >
                Recommended Teams
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/"
                className={`text-dark text-nowrap ${styles.navlinks}`}
              >
                Join a team
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/"
                className={`text-dark text-nowrap ${styles.navlinks}`}
              >
                Explore Hackathons
              </Nav.Link>
            </Nav>
            <div className="d-flex justify-content-center   ">
              {isLoggedIn ? <UserAuthenticatedMenu onLogout={onLogout} /> : <GuestAuthButtons />}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
  
}

export default AppNavbar;
