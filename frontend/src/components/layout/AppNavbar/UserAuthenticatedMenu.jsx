import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./UserAuthenticatedMenu.module.css";
import { useAuth } from "../../../context/AuthContext/useAuth.js";
import { useNotifications } from "../../../context/NotificationContext.jsx";
import { Bell } from "lucide-react";
import { getAvatarUrl } from "../../../utils/getAvatarUrl";

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


function UserAuthenticatedMenu({ onLogout }) {
  const [isOpen, setIsopen] = useState(false);
  const { user } = useAuth();
  console.log("USER:", user);
  console.log("PROFILE:", user?.profilePicture);
  const { unreadCount } = useNotifications();
  const rawName = user?.name || "User";
  const firstName = rawName.split(" ")[0];
  let displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  if (displayName.length > 10) {
    displayName = displayName.substring(0, 10) + "...";
  }

  const ANONYMOUS_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const avatarUrl = getAvatarUrl(user?.profilePicture);

  return (
    <div className="d-flex gap-3 align-items-center mt-lg-2 mt-3">
      <Link to="/notifications" className={styles.notificationLink}>
        <Bell size={35} />
        {unreadCount > 0 && (
          <span className={styles.notificationDot} />
        )}
      </Link>

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
            src={avatarUrl}
            alt="User"
            className={styles.avatar}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ANONYMOUS_AVATAR;
            }}
          />
          <p className={`mb-0 fs-4 fw-semibold ${styles.userName}`}>Hi, {displayName}</p>
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
          <Dropdown.Item as={Link} to="/progress-Tracker" className={styles.menuItem}>
            <span className={styles.icon}>
              {/* <ProfileIcon></ProfileIcon> */}
            </span>{" "}
            View Team Progress
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

    </div>
  );
}

export default UserAuthenticatedMenu;
