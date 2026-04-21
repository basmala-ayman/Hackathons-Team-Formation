import { Dropdown } from "react-bootstrap";
import styles from "./UserAuthenticatedMenu.module.css";
import { BellIcon, ProfileIcon, DashboardIcon } from "../../../assets/Icons";
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
              src="https://via.placeholder.com/40" 
              alt="User" 
              className={styles.avatar} 
            />
            <span className={styles.userName}>Omar H.</span>
            {/* Replace with Chevron Icon */}
            <span className={styles.arrow}>▼</span>
          </div>
        </Dropdown.Toggle>
    </Dropdown>

      <div></div>
    </div>
  );
}

export default UserAuthenticatedMenu;
