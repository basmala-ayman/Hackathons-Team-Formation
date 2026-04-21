import { Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./UserAuthenticatedMenu.module.css";
import defaultProfile from "../../../assets/defaultProfile.png";
import { BellIcon, ChevronIconUp , ChevronIconDown, ProfileIcon, DashboardIcon } from "../../../assets/Icons";


function UserAuthenticatedMenu() {
  return (
    <div className="d-flex gap-3 align-items-center mt-5">
      <div>
        <span className={styles.bellIcon}><BellIcon/></span>
        <span className={styles.badge}></span>
      </div>
    
    <Dropdown>
      <Dropdown.Toggle className={`${styles.customToggle} d-flex gap-2 `}>

            <img 
              src={defaultProfile}
              width={30}
              alt="User" 
              className={styles.avatar} 
            />
            <p className={`mt-4 fs-5 fw-semibold ${styles.userName}`}>Omar H.</p>
            <div className={styles.arrow}><ChevronIconDown/></div>

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
      Settings
  </Dropdown.Item>
  
  <Dropdown.Item as={Link} to="/logout" className={`${styles.menuItem} ${styles.logoutBtn}`}>
     Logout
  </Dropdown.Item>
</Dropdown.Menu>
    </Dropdown>

      <div></div>
    </div>
  );
}

export default UserAuthenticatedMenu;
