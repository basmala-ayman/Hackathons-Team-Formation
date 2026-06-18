import React from "react";
import { FolderHeart, Trophy, Calendar, Users, Heart } from "lucide-react";
import styles from "./MyProjectIdeasCard.module.css";
import { useAuth } from "../../../context/AuthContext/useAuth";

const ANONYMOUS_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function MyProjectIdeasCard({ projects = [], userAvatar }) {
  const { user: authUser } = useAuth();

  if (!projects || projects.length === 0) {
    return (
      <div className={styles.mainContainerCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <FolderHeart size={22} className={styles.headerIcon} />
            <h4 className={styles.sectionTitle}>My Project Ideas</h4>
          </div>
        </div>

        <div className={styles.emptyStateContainer}>
          <p className={styles.emptyStateTitle}>
            No project ideas added yet.
          </p>
          <span className={styles.emptyStateSubtext}>
            Create your own project ideas to showcase them here!
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.mainContainerCard}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <FolderHeart size={22} className={styles.headerIcon} />
          <h4 className={styles.sectionTitle}>My Project Ideas</h4>
        </div>
      </div>

      <div className={styles.ideasGrid}>
        {projects.map((idea) => {
          const projectId = idea.id || idea._id;

          const connectedHackathon = idea.interestedHackathon;
          const hackathonTitle = connectedHackathon?.title || idea.hackathonTitle || "Independent Project";
          const hackathonSchedule = connectedHackathon?.status || idea.date || "Ongoing";

          return (
            <div key={projectId} className={styles.ideaCard}>

              {/* Creator Card Header */}
              <div className={styles.creatorHeader}>
                <div className={styles.creatorAvatarWrapper}>
                  <img
                    src={userAvatar || ANONYMOUS_AVATAR}
                    alt="Creator"
                    className={styles.creatorImg}
                  />
                </div>
                <div className={styles.creatorMeta}>
                  <span className={styles.creatorName}>{authUser?.name || "User"}</span>
                  <span className={styles.creatorBadge}>Project Creator</span>
                </div>
              </div>

              <h5 className={styles.ideaTitle}>{idea.title}</h5>
              <p className={styles.ideaDesc}>{idea.desc}</p>

              {/* Dynamic Connected Hackathon Row */}
              <div className={styles.hackathonRow}>
                <div className={styles.metaItem}>
                  <Trophy size={14} className={styles.metaIcon} />
                  <span className="text-truncate" style={{ maxWidth: "160px" }}>{hackathonTitle}</span>
                </div>
                <div className={styles.metaItem}>
                  <Calendar size={14} className={styles.metaIcon} />
                  <span>{hackathonSchedule}</span>
                </div>
              </div>

              {/* Skills Tags Array Mapping */}
              {idea.skills && idea.skills.length > 0 && (
                <div className={styles.skillsSection}>
                  <h6 className={styles.skillsTitle}>Required Skills</h6>
                  <div className={styles.skillsWrapper}>
                    {idea.skills.map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        {skill.startsWith("#") ? skill : `#${skill}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Footer Metrics */}
              <div className={styles.cardFooter}>
                <div className={styles.footerInfo}>
                  <div className={styles.infoBadge}>
                    <Users size={14} /> <span>{idea.teamSize || "Team of 4"}</span>
                  </div>
                  <div className={styles.infoBadge}>
                    <Heart size={14} className={styles.heartIcon} /> <span>{idea.interestedCount || "0 interested"}</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(MyProjectIdeasCard);