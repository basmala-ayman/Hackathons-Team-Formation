import React, { useState } from "react";
import { FolderHeart, Users, Heart } from "lucide-react";
import styles from "./MyProjectIdeasCard.module.css";
import { useAuth } from "../../../context/AuthContext/useAuth";

const ANONYMOUS_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function MyProjectIdeasCard({ projects = [], userAvatar }) {
  const { user: authUser } = useAuth();
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

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
          <p className={styles.emptyStateTitle}>No project ideas added yet.</p>
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
        {currentProjects.map((idea) => {
          const projectId = idea.id;
          const title = idea.title;
          const description = idea.description;
          const skills = idea.requiredSkillsOrRoles || [];
          const teamSize = idea.totalTeamMembersCount;
          const interestedCount = idea.totalInterestsCount;

          return (
            <div key={projectId} className={styles.ideaCard}>
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

              <h5 className={styles.ideaTitle}>{title}</h5>
              <p className={styles.ideaDesc}>{description}</p>

              {skills.length > 0 && (
                <div className={styles.skillsSection}>
                  <h6 className={styles.skillsTitle}>Required Skills</h6>
                  <div className={styles.skillsWrapper}>
                    {skills.map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.cardFooter}>
                <div className={styles.footerInfo}>
                  <div className={styles.infoBadge}>
                    <Users size={14} />{" "}
                    <span>
                      {teamSize} {teamSize > 1 ? "Members" : "Member"}
                    </span>
                  </div>
                  <div className={styles.infoBadge}>
                    <Heart size={14} className={styles.heartIcon} />
                    <span>{interestedCount} Interested</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationControls}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(MyProjectIdeasCard);