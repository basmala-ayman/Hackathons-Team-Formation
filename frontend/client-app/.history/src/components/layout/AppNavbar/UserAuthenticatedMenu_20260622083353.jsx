import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./UserAuthenticatedMenu.module.css";
import defaultProfile from "../../../assets/defaultProfile.png";
import { useAuth } from "../../../context/AuthContext/useAuth.js";
import { getUnreadCount } from "../../../services/notificationService";
import {
  getCSSVariable

} from "../../../utils/getColors.js";
import {
  BellIcon,
  ChevronIconUp,
  ChevronIconDown,
  ProfileIcon,
  DashboardIcon,
} from "../../../assets/Icons";
import { useState } from "react";

function UserAuthenticatedMenu({ onLogout }) {
  const [isOpen, setIsopen] = useState(false);
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const rawName = user?.name || "User";
const firstName = rawName.split(" ")[0];
const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
if (displayName.length > 10) {
  displayName = displayName.substring(0, 10) + "...";
}

  useEffect(() => {
    getUnreadCount()
      .then((count) => setUnreadCount(count))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="d-flex gap-3 align-items-center mt-lg-2 mt-3">
      <div>
        <Link to="/notifications" className="position-relative">
          <span className={styles.bellIcon}>
            <BellIcon />
          </span>
          {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount > 9 ? "9+" : unreadCount}</span>
          )}
        </Link>
      </div>

      <Dropdown
        className={`${styles.wrapper}`}
        show={isOpen}
        onToggle={(newValue) => {
          setIsopen(newValue);
        }}
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
          <p className={`mb-0 fs-5 fw-semibold ${styles.userName}`}>{displayName}</p>
          <span className={` ${styles.arrow}`}>
            {isOpen ? <ChevronIconUp /> : <ChevronIconDown />}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.customMenu}>
          <Dropdown.Item as={Link} to="/userprofile" className={styles.menuItem}>
            <span className={styles.icon}>
              {/* <ProfileIcon></ProfileIcon> */}
            </span>{" "}
            View Profile
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/userdashboard" className={styles.menuItem}>
            <span className={styles.icon}>
              {/* <DashboardIcon></DashboardIcon> */}
            </span>{" "}
            Dashboard
          </Dropdown.Item>

          <Dropdown.Divider />
          <Dropdown.Item
            as={Link}
            to="/"
            style={{ color: getCSSVariable("--color-error-red") }}
            className={`${styles.menuItem}`}
            onClick={onLogout}
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
