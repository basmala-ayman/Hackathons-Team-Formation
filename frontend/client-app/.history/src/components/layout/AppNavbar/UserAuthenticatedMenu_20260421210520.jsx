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
    
    

      <div></div>
    </div>
  );
}

export default UserAuthenticatedMenu;
