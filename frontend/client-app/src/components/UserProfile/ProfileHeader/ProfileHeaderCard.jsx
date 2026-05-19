import React, { useRef } from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../../../shared/Icons/GoogleGithubIcons.jsx";
import { MapPin, Mail, Link2, Calendar, Edit3 } from "lucide-react";
import styles from "./ProfileHeaderCard.module.css";

const ANONYMOUS_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function ProfileHeaderCard({ user, onEditClick, setFormData, isOnwer }) {
  const fileInputRef = useRef(null);

  const handleAvatarClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localImageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: localImageUrl,
        avatarFile: file
      }));
    }
  };

  return (
    <div className={styles.profileMainCard}>
      <div className="d-flex flex-column flex-md-row gap-4 align-items-start position-relative">

        <div className="d-flex flex-column align-items-center gap-3">
          <div className={styles.avatarWrapper}>
            <img
              src={user.avatar || ANONYMOUS_AVATAR}
              alt={user.name}
              className={styles.avatarImg}
            />
            {isOnwer && (<button
              type="button"
              className={styles.avatarEditBtn}
              onClick={handleAvatarClick}
              aria-label="Change Avatar"
            >
              <Edit3 size={14} />
            </button>)}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="d-none"
            />
          </div>

          <div className="d-flex gap-2 justify-content-center">
            <a href="#" className={styles.socialIconBtn}><GithubIcon size={18} className="m-0" /></a>
            <a href="#" className={styles.socialIconBtn}><LinkedinIcon size={18} className="m-0" /></a>
            <a href="#" className={styles.socialIconBtn}><TwitterIcon size={18} className="m-0" /></a>
          </div>
        </div>

        <div className="flex-grow-1 w-100">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 w-100 mt-4">
            <div>
              <h2 className={styles.profileName}>{user.name}</h2>
              <span className={styles.profileUsername}>{user.username}</span>
            </div>
            {isOnwer && (<button className={styles.editProfileBtn} onClick={onEditClick}>
              <Edit3 size={16} className="me-2" /> Edit Profile
            </button>)}

          </div>

          <p className={styles.profileBio}>{user.bio}</p>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <MapPin size={16} className={styles.infoIcon} /> {user.location}
            </div>
            <div className={styles.infoItem}>
              <Mail size={16} className={styles.infoIcon} /> {user.email}
            </div>
            <div className={styles.infoItem}>
              <Link2 size={16} className={styles.infoIcon} />
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className={styles.profileLink}>
                {user.website}
              </a>
            </div>
            <div className={styles.infoItem}>
              <Calendar size={16} className={styles.infoIcon} /> {user.joinedDate}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}