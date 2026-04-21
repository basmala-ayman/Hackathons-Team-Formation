import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./UserAuthenticatedMenu.module.css";
import defaultProfile from "../../../assets/defaultProfile.png";
import {
  BellIcon,
  ChevronIconUp,
  ChevronIconDown,
  ProfileIcon,
  DashboardIcon,
} from "../../../assets/Icons";
import { useState } from "react";

function UserAuthenticatedMenu() {
  const [isOpen, setIsopen]=useState(false)
  return (
    <div className="d-flex gap-3 align-items-center ">
      <div>
        <span className={styles.bellIcon}>
          <BellIcon />
        </span>
        <span className={styles.badge}></span>
      </div>

      <Dropdown className={`${styles.wrapper}`}
      show={isOpen}
      onToggle={(newValue)=>{setIsopen(newValue)}}
      >
        <Dropdown.Toggle
        variant="none"
          className={`${styles.customToggle} d-flex gap-2 align-items-center p-2`}
        >
          <img
            src={defaultProfile}
            width={35}
            height={35}
            alt="User"
            className={`rounded-circle  ${styles.avatar}`}
          />
          <p className={`mt-4 fs-5 fw-semibold ${styles.userName}`}>Omar H.</p>
          <span className={`mt-2 ${styles.arrow}`}>
            {isOpen?<ChevronIconUp />:<ChevronIconDown/>}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.customMenu}>
          <Dropdown.Item as={Link} to="/profile" className={styles.menuItem}>
            <span className={styles.icon}>
              {/* <ProfileIcon></ProfileIcon> */}
            </span>{" "}
            View Profile
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/dashboard" className={styles.menuItem}>
            <span className={styles.icon}>
              {/* <DashboardIcon></DashboardIcon> */}
            </span>{" "}
            Dashboard
          </Dropdown.Item>

          <Dropdown.Divider />
          <Dropdown.Item
            as={Link}
            to="/logout"
            className={`${styles.menuItem}`}
           
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div></div>
    </div>
  );
}

export default UserAuthenticatedMenu;
