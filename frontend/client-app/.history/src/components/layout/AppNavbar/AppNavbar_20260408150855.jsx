import {Container, Nav,Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png'
import BellIcon from "./BellIcon";
import profilePic from "../assets/profile.jpg";
import Chevron from "./Chevron";
import "./Navbar.css";

function AppNavbar() {
  return (
    <Navbar>
      <Container>
      <Navbar.Brand className="navbar-logo">
        <img src={logo} alt="logo" />
      </Navbar.Brand>

      <ul className="navbar-links">
        <li>For Participants </li>
        <li>Create a team</li>
        <li>Join a team</li>
        <li>Explore Hackathons</li>
      </ul>
      <div className="navbar-actions">
        <BellIcon className="bell" />
        
          <div className="profile">
            <div className="profile-info">
            <img src={profilePic} alt="profile pic" className="profile-pic" />
            <p>
              Sara K. 
            </p>
            </div>
            <Chevron className="chevron"/>
          </div>
        </div>
    </Container>
    </Navbar>
  );
  
}

export default AppNavbar;
