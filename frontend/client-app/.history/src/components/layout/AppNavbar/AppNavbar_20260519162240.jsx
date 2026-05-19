// import logo from '../../../assets/logo.png'
import styles from "./AppNavbar.module.css";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import logo from "../../../assets/logo.png";
import UserAuthenticatedMenu from "./UserAuthenticatedMenu";
import GuestAuthButtons from "./GuestAuthButtons";
// import { useTheme } from "../../../context/ThemeContext";
// import { Sun, Moon } from "lucide-react";
function AppNavbar({ isLoggedIn, onLogout }) {
  // const { theme, toggleTheme } = useTheme();
  return (
    <Navbar expand="xl" className={`${styles.navbar}`}>
      <Container className="">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Team Catalyst Logo" height="70" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler} />
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
                to="/createTeam"
                className={`text-dark text-nowrap ${styles.navlinks}`}
              >
                Create a team
              </Nav.Link>
             
              <Nav.Link
                as={Link}
                to="/explore-Projects"
                className={`text-dark text-nowrap ${styles.navlinks}`}
              >
                Explore Project Ideas
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/explore-Hackathons"
                className={`text-dark text-nowrap ${styles.navlinks}`}
              >
                Explore Hackathons
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/recommendedTeams"
                className={`text-dark text-nowrap ${styles.navlinks}`}
              >
                Recommended Teams
              </Nav.Link>
            </Nav>
            <div className="d-flex justify-content-center">
              {/* <button
                onClick={toggleTheme}
                className={styles.themeToggle}
                aria-label="Toggle Dark Mode"
              >
                {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
              </button> */}
              {isLoggedIn ? <UserAuthenticatedMenu onLogout={onLogout} /> : <GuestAuthButtons />}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );

}

export default AppNavbar;
