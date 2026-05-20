import React, { useRef } from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../../../shared/Icons/GoogleGithubIcons.jsx";
import { MapPin, Mail, Link2, Calendar, Edit3 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext/useAuth.js";
import styles from "./ProfileHeaderCard.module.css";

const ANONYMOUS_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function ProfileHeaderCard({ user: detailedUser, onEditClick, setFormData, isOwner }) {
  const fileInputRef = useRef(null);
  const { user: authUser } = useAuth();

  const user = {
    name: detailedUser?.name || authUser?.name || "Loading Name...",
    email: detailedUser?.email || authUser?.email || "No email available",
    avatar: detailedUser?.profilePicture || detailedUser?.avatar || authUser?.profilePicture || null,
    bio: detailedUser?.bio || "No bio added yet.",
    githubUrl: detailedUser?.github || detailedUser?.githubUrl || "",
    linkedinUrl: detailedUser?.linkedin || detailedUser?.linkedinUrl || "",
    website: detailedUser?.website || "portfolio.com",
    joinedDate: detailedUser?.joinedDate || "Recently",
  };

  const handleAvatarClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
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
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className={styles.avatarImg}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ANONYMOUS_AVATAR;
                }}
              />
            ) : (
              <img
                src={ANONYMOUS_AVATAR}
                alt="Placeholder avatar"
                className={styles.avatarImg}
              />
            )}

            {isOwner && (
              <button
                type="button"
                className={styles.avatarEditBtn}
                onClick={handleAvatarClick}
                aria-label="Change Avatar"
              >
                <Edit3 size={14} />
              </button>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="d-none"
            />
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <a
              href={user.githubUrl ? (user.githubUrl.startsWith('http') ? user.githubUrl : `https://${user.githubUrl}`) : "#"}
              target="_blank"
              rel="noreferrer"
              className={`${styles.socialIconBtn} ${!user.githubUrl ? styles.disabledIcon : ""}`}
            >
              <GithubIcon size={18} className="m-0" />
            </a>
            <a
              href={user.linkedinUrl ? (user.linkedinUrl.startsWith('http') ? user.linkedinUrl : `https://${user.linkedinUrl}`) : "#"}
              target="_blank"
              rel="noreferrer"
              className={`${styles.socialIconBtn} ${!user.linkedinUrl ? styles.disabledIcon : ""}`}
            >
              <LinkedinIcon size={18} className="m-0" />
            </a>
            <a href="#" className={styles.socialIconBtn}>
              <TwitterIcon size={18} className="m-0" />
            </a>
          </div>
        </div>

        <div className="flex-grow-1 w-100">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 w-100 mt-4">
            <div>
              <h2 className={styles.profileName}>{user.name}</h2>
              <span className={styles.profileUsername}>{detailedUser?.username || "@user"}</span>
            </div>
            {isOwner && (
              <button className={styles.editProfileBtn} onClick={onEditClick}>
                <Edit3 size={16} className="me-2" /> Edit Profile
              </button>
            )}
          </div>

          <p className={styles.profileBio}>{user.bio}</p>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Mail size={16} className={styles.infoIcon} /> {user.email}
            </div>
            <div className={styles.infoItem}>
              <Link2 size={16} className={styles.infoIcon} />
              <a href={user.website.startsWith('http') ? user.website : `https://${user.website}`} target="_blank" rel="noreferrer" className={styles.profileLink}>
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