import styles from "./ProjectCard.module.css";
import { useState } from "react";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import defaultProfile from "../../../assets/defaultProfile.jpg";
function ProjectCard({
  creator,
  title,
  description,
  hackathonName,
  dateRange,
  skills = [],
  roles = [],
  maxTeamSize = 4,
  interestedCount = 0,
  onInterestToggle,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleSkills = isExpanded ? skills : skills.slice(0, 3);
  const hasHiddenSkills = skills.length > 3;
  const visibleRoles = isExpanded ? roles : roles.slice(0, 3);
  const hasHiddenRoles = roles.length > 3;
  return (
    <div
      className={`p-4 d-flex flex-column justify-content-between ${styles.cardWrapper}`}
    >
      {/* Header Profile */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          src={creator.avatarUrl || defaultProfile}
          alt={creator.name}
          className={styles.creatorAvatar}
        />
        <div>
          <h6 className={`fw-bold fs-3 mb-0 ${styles.creatorName}`}>
            {creator.name}
          </h6>
          <small className={styles.creatorLabel}>Project Creator</small>
        </div>
      </div>

      <h3
        className={`fw-bolder mb-2 ${isExpanded ? styles.projectTitleExpanded : styles.projectTitleCollapsed}`}
      >
        {title}
      </h3>
      <p
        className={`mb-3 ${isExpanded ? styles.descriptionExpanded : styles.descriptionCollapsed}`}
      >
        {description}
      </p>

      {/* hackathon name & date */}
      <div className="d-flex align-items-center gap-4 flex-wrap mb-4">
        <div className={`d-flex align-items-center gap-2 ${styles.metaText}`}>
          {/* <HiOutlineTrophy className={styles.purpleIcon} size={20} /> */}
          <span>{hackathonName}</span>
        </div>
        <div className={`d-flex align-items-center gap-2 ${styles.metaText}`}>
          {/* <HiOutlineCalendar className={styles.purpleIcon} size={20} /> */}
          <span className="text-uppercase">{dateRange}</span>
        </div>
      </div>

      {/* required roles */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-2 text-dark fw-bold fs-5">
          {/* <HiOutlineAdjustmentsHorizontal className={styles.purpleIcon} size={22} /> */}
          <span className={styles.skillsSectionTitle}>Required Roles</span>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {visibleRoles.map((role, index) => (
            <span key={index} className={styles.skillPill}>
              #{role}
            </span>
          ))}
          {!isExpanded && hasHiddenRoles && (
            <span className={styles.moreSkillsIndicator}>
              +{roles.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* required skills */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-2 text-dark fw-bold fs-5">
          {/* <HiOutlineAdjustmentsHorizontal className={styles.purpleIcon} size={22} /> */}
          <span className={styles.skillsSectionTitle}>Required Skills</span>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {visibleSkills.map((skill, index) => (
            <span key={index} className={styles.skillPill}>
              #{skill}
            </span>
          ))}

          {!isExpanded && hasHiddenSkills && (
            <span className={styles.moreSkillsIndicator}>
              +{skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-start mb-4">
        <button
          type="button"
          className={`btn p-0 border-0 ${styles.readMoreContainer}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <span className={styles.toggleText}>Show Less</span>
          ) : (
            <span className={styles.toggleText}>
              ... Show Full Project Details
            </span>
          )}
        </button>
      </div>

      {/* Card Footer*/}
        <div className="d-flex justify-content-between align-items-center mb-3 pt-3 border-top">
          <div
            className={`d-flex align-items-center gap-2 ${styles.bottomStat}`}
          >
            {/* <HiOutlineUsers size={20} /> */}
            <span>Team of {maxTeamSize}</span>
          </div>
          <div
            className={`d-flex align-items-center gap-2 ${styles.bottomStat}`}
          >
            {/* <HiOutlineHeart size={20} className="text-danger" /> */}
            <span>{interestedCount} interested</span>
          </div>

        <CustomButton
          variant="primary"
          className="w-100 py-3 fw-semibold text-white d-flex align-items-center justify-content-center gap-2 fs-5"
          onClick={onInterestToggle}
        >
          {/* <HiOutlineHeart size={22} /> */}
          <span>I'm Interested</span>
        </CustomButton>
      </div>
    </div>
  );
}

export default ProjectCard;
