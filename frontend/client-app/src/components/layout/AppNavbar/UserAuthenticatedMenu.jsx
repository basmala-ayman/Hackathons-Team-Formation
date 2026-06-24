import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./UserAuthenticatedMenu.module.css";
import defaultProfile from "../../../assets/defaultProfile.png";
import { useAuth } from "../../../context/AuthContext/useAuth.js";
import { useNotifications } from "../../../context/NotificationContext.jsx";
import { Bell } from "lucide-react";

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
  const { unreadCount } = useNotifications();
  const rawName = user?.name || "User";
  const firstName = rawName.split(" ")[0];
  let displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  if (displayName.length > 10) {
    displayName = displayName.substring(0, 10) + "...";
  }

  const ANONYMOUS_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const avatarUrl = (() => {
    const pic = user?.profilePicture || user?.avatar;
    if (!pic) return ANONYMOUS_AVATAR;
    if (pic.startsWith("http")) return pic;
    const baseUrl = BACKEND_URL.replace("/api/v1", "");
    const path = pic.startsWith("/") ? pic : `/${pic}`;
    return `${baseUrl}${path}`;
  })();

  console.log("Navbar unreadCount:", unreadCount);

  return (
    <div className="d-flex gap-3 align-items-center mt-lg-2 mt-3">
      <Link to="/notifications" className={styles.notificationLink}>
        <Bell size={28} />
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
            width={35}
            height={35}
            alt="User"
            className={`rounded-circle ${styles.avatar}`}
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
