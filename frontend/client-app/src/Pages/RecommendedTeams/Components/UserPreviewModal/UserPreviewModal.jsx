import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./UserPreviewModal.module.css";
import { getAvatarUrl } from "../../../../utils/getAvatarUrl";
import { getUserBasicInfo } from "../../../../services/userService";
import defaultProfile from "../../../../assets/defaultProfile.jpg";
import { LoadingState } from "../../../../shared/States";

export default function UserPreviewModal({ show, onHide, member }) {
  const [fullInfo, setFullInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show || !member?.userId) return;
    setLoading(true);
    setFullInfo(null);
    getUserBasicInfo(member.userId)
      .then(setFullInfo)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [show, member?.userId]);

  if (!member) return null;

  const data = fullInfo || member;

  const formatRole = (role) => {
    const text = role.replace(/_/g, " ").toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const roles =
    data.techRoles?.length > 0
      ? data.techRoles
      : Array.isArray(data.role)
        ? data.role
        : data.role
          ? [data.role]
          : [];

  return (
    <Modal show={show} onHide={onHide} centered contentClassName={styles.modal}>
      <Modal.Body className={styles.body}>
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.closeBtn}>
                <button className={styles.closeBtnInner} onClick={onHide} aria-label="Close">
                  <i className="ti ti-x" style={{ fontSize: "14px" }} aria-hidden="true" />
                </button>
              </div>

              <div className={styles.avatarWrapper}>
                <img
                  src={getAvatarUrl(
                    data.profilePicture || data.avatarUrl ||
                    member.profilePicture || member.avatarUrl
                  )}
                  alt={data.name || "Member"}
                  className={styles.avatar}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultProfile;
                  }}
                />
              </div>

              <h3 className={styles.name}>{data.name || "Unknown Member"}</h3>

              {roles.length > 0 && (
                <div className={styles.roles}>
                  {roles.map((role) => (
                    <span key={role} className={styles.roleBadge}>
                      {formatRole(role)}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Contact</p>

              <div className={styles.infoList}>
                {data.email && (
                  <a href={`mailto:${data.email}`} className={styles.infoRow}>
                    <i className="ti ti-mail" aria-hidden="true" />
                    <span>{data.email}</span>
                  </a>
                )}

                {(data.githubUrl || data.linkedinUrl) && (
                  <div className={styles.socialGrid}>
                    {data.githubUrl && (
                      <a
                        href={data.githubUrl.startsWith("http") ? data.githubUrl : `https://${data.githubUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.socialRow}
                      >
                        <span className={styles.socialLeft}>
                          <i className="ti ti-brand-github" aria-hidden="true" />
                          GitHub
                        </span>
                        <i
                          className={`ti ti-external-link ${styles.externalIcon}`}
                          aria-hidden="true"
                        />
                      </a>
                    )}

                    {data.linkedinUrl && (
                      <a
                        href={data.linkedinUrl.startsWith("http") ? data.linkedinUrl : `https://${data.linkedinUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.socialRow}
                      >
                        <span className={styles.socialLeft}>
                          <i className="ti ti-brand-linkedin" aria-hidden="true" />
                          LinkedIn
                        </span>
                        <i
                          className={`ti ti-external-link ${styles.externalIcon}`}
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {data.skills?.length > 0 && (
              <div className={styles.skillsSection}>
                <p className={styles.sectionLabel}>Skills</p>
                <div className={styles.skillsWrapper}>
                  {data.skills.map((skill) => (
                    <span key={skill} className={styles.skillBadge}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bio */}
            {data.bio && <p className={styles.bio}>{data.bio}</p>}
          </>
        )
        }
      </Modal.Body >
    </Modal >
  );
}