import React, { useState } from "react";
import {
  FolderHeart,
  Users,
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import styles from "./MyProjectIdeasCard.module.css";
import { useAuth } from "../../../context/AuthContext/useAuth";
import { getAvatarUrl, ANONYMOUS_AVATAR } from "../../../utils/getAvatarUrl";

function MyProjectIdeasCard({ projects = [] }) {
  const { user: authUser } = useAuth();
  const [expandedProject, setExpandedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  if (!projects || projects.length === 0) {
    return (
      <div className={styles.mainContainerCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleGroup}>
            <FolderHeart
              size={22}
              className={styles.headerIcon}
            />
            <h4 className={styles.sectionTitle}>
              My Project Ideas
            </h4>
          </div>

          <span className={styles.subBadgeCount}>
            {projects.length} Active
          </span>
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
        <span className={styles.subBadgeCount}>
          {projects.length} Active
        </span>
      </div>

      <div className={styles.ideasGrid}>
        {currentProjects.map((idea) => {
          const projectId = idea.id;
          const isExpanded = expandedProject === projectId;

          const title = idea.title;
          const description = idea.description || "";
          const skills = idea.requiredSkillsOrRoles || [];
          const teamSize = idea.totalTeamMembersCount;
          const interestedCount = idea.totalInterestsCount;

          return (
            <div key={projectId} className={styles.ideaCard}>
              <div className={styles.creatorHeader}>
                <div className={styles.creatorAvatarWrapper}>
                  <img
                    src={getAvatarUrl(authUser?.profilePicture)}
                    alt="Creator"
                    className={styles.creatorImg}
                  />
                </div>

                <div className={styles.creatorMeta}>
                  <span className={styles.creatorName}>
                    {authUser?.name || "User"}
                  </span>

                  <div className={styles.metaRow}>
                    <span className={styles.createdDate}>
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </span>

                    <span className={styles.statusBadge}>
                      {idea.teamStatus || "FORMING"}
                    </span>
                  </div>
                </div>
              </div>

              <h5 className={styles.ideaTitle}>{title}</h5>

              <p className={styles.ideaDesc}>
                {isExpanded
                  ? description
                  : description.length > 120
                    ? description.slice(0, 120) + "..."
                    : description}
              </p>

              {description.length > 120 && (
                <button
                  type="button"
                  className={styles.showMoreBtn}
                  onClick={() =>
                    setExpandedProject(isExpanded ? null : projectId)
                  }
                >
                  <span>
                    {isExpanded ? "Show Less" : "Show Full Project Details"}
                  </span>

                  {isExpanded ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
              )}

              {skills.length > 0 && (
                <div className={styles.skillsSection}>
                  <h6 className={styles.skillsTitle}>
                    Required Skills/Roles
                  </h6>

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
                    <Users size={14} />
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
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={
                currentPage === i + 1
                  ? styles.activePage
                  : ""
              }
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(MyProjectIdeasCard);