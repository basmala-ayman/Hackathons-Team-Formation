import { Dropdown , Link } from "react-bootstrap";
import styles from "./UserAuthenticatedMenu.module.css";
import { BellIcon, ChevronIcon, ProfileIcon, DashboardIcon } from "../../../assets/Icons";
import img from '../../../assets/defaultImg.png'

function UserAuthenticatedMenu() {
  return (
    <div className="d-flex gap-2 align-items-center">
      <div>
        <span className={styles.bellIcon}><BellIcon/></span>
        <span className={styles.badge}></span>
      </div>
    
    <Dropdown>
      <Dropdown.Toggle className={styles.customToggle}>
          <div className={styles.userInfo}>
            <img 
              src={img} 
              alt="User" 
              className={styles.avatar} 
            />
            <span className={styles.userName}>Omar H.</span>
            <span className={styles.arrow}><ChevronIcon/></span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.customMenu}>

  <Dropdown.Item as={Link} to="/profile" className={styles.menuItem}>
     <span className={styles.icon}><ProfileIcon></ProfileIcon></span> View Profile
  </Dropdown.Item>
  
  <Dropdown.Item as={Link} to="/dashboard" className={styles.menuItem}>
     <span className={styles.icon}><DashboardIcon></DashboardIcon></span> Dashboard
  </Dropdown.Item>
  
  <Dropdown.Divider />
  
  <Dropdown.Item as={Link} to="/settings" className={styles.menuItem}>
     <span className={styles.icon}></span> Settings
  </Dropdown.Item>
  
  <Dropdown.Item as={Link} to="/logout" className={`${styles.menuItem} ${styles.logoutBtn}`}>
     <span className={styles.icon}>🚪</span> Logout
  </Dropdown.Item>
</Dropdown.Menu>
    </Dropdown>

      <div></div>
    </div>
  );
}

export default UserAuthenticatedMenu;
