import React, { useRef, useEffect, useState } from "react";
import { GithubIcon, LinkedinIcon } from "../../../shared/Icons/GoogleGithubIcons.jsx";
import { Mail, Link2, Edit3 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext/useAuth.js";
import styles from "./ProfileHeaderCard.module.css";
import { getAvatarUrl, ANONYMOUS_AVATAR } from "../../../utils/getAvatarUrl";
// const ANONYMOUS_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function ProfileHeaderCard({ user: detailedUser, onEditClick, setFormData, isOwner }) {
  const fileInputRef = useRef(null);
  const { user: authUser, setUser } = useAuth();
  const [previewUrl, setPreviewUrl] = useState(detailedUser?.avatar || null);

  useEffect(() => {
    if (!detailedUser?.avatarFile) {
      setPreviewUrl(detailedUser?.avatar || null);
    }
  }, [detailedUser?.avatar, detailedUser?.avatarFile]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const user = {
    name: detailedUser?.name || authUser?.name || "Loading Name...",
    email: detailedUser?.email || authUser?.email || "No email available",
    bio: detailedUser?.bio || "No bio added yet.",
    githubUrl: detailedUser?.github || detailedUser?.githubUrl || "",
    linkedinUrl: detailedUser?.linkedin || detailedUser?.linkedinUrl || "",
  };

  const handleAvatarClick = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    const blobUrl = URL.createObjectURL(file);
    setPreviewUrl(blobUrl);
    setUser(prev => ({
      ...prev,
      profilePicture: blobUrl,
    }));
    setFormData(prev => ({ ...prev, avatar: blobUrl, avatarFile: file }));
    e.target.value = "";
  };

  return (
    <div className={styles.profileMainCard}>
      <div className="d-flex flex-column flex-md-row gap-4 align-items-start position-relative">
        <div className="d-flex flex-column align-items-center gap-3">
          <div className={styles.avatarWrapper}>
            <img
              src={getAvatarUrl(previewUrl)}
              alt={`${user.name}'s avatar`}
              className={styles.avatarImg}
              onError={(e) => { e.target.onerror = null; e.target.src = ANONYMOUS_AVATAR; }}
            />
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
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="d-none" />
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <a href={user.githubUrl ? (user.githubUrl.startsWith('http') ? user.githubUrl : `https://${user.githubUrl}`) : "#"}
              target="_blank" rel="noreferrer"
              className={`${styles.socialIconBtn} ${!user.githubUrl ? styles.disabledIcon : ""}`}>
              <GithubIcon size={18} className="m-0" />
            </a>
            <a href={user.linkedinUrl ? (user.linkedinUrl.startsWith('http') ? user.linkedinUrl : `https://${user.linkedinUrl}`) : "#"}
              target="_blank" rel="noreferrer"
              className={`${styles.socialIconBtn} ${!user.linkedinUrl ? styles.disabledIcon : ""}`}>
              <LinkedinIcon size={18} className="m-0" />
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
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <Mail size={16} className={styles.infoIcon} />
              <span>{user.email}</span>
            </div>
            <div className={styles.infoItem}>
              <Link2 size={16} className={styles.infoIcon} />
              {user.githubUrl ? (
                <a href={user.githubUrl.startsWith('http') ? user.githubUrl : `https://${user.githubUrl}`}
                  target="_blank" rel="noreferrer" className={styles.profileLink}>{user.githubUrl}</a>
              ) : <span className="text-muted">No GitHub link added</span>}
            </div>
            <div className={styles.infoItem}>
              <Link2 size={16} className={styles.infoIcon} />
              {user.linkedinUrl ? (
                <a href={user.linkedinUrl.startsWith('http') ? user.linkedinUrl : `https://${user.linkedinUrl}`}
                  target="_blank" rel="noreferrer" className={styles.profileLink}>{user.linkedinUrl}</a>
              ) : <span className="text-muted">No LinkedIn link added</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}