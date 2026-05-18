import styles from "./ProjectCard.module.css";
import { useState, useEffect, useRef } from "react";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import defaultProfile from "../../../assets/defaultProfile.jpg";
import {
  PrizeIcon,
  CirclesIcon,
  CodeIcon,
  CalenderIcon,
  TeamIcon,
  ChevronIconUp,
  ChevronIconDown,
  HeartIcon,
} from "../../../assets/Icons";
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

  //condition to show (show more) or not
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [canExpand, setCanExpand] = useState(false); //can expand and show more details or not

  useEffect(() => {
    const titleDom = titleRef.current;
    const descDom = descRef.current;

    if (titleElement && descElement) {
      // is  real hight > the height that user see
      const isTitleClipped =
        titleElement.scrollHeight > titleElement.clientHeight;
      const isDescClipped = descElement.scrollHeight > descElement.clientHeight;

      if (
        isTitleClipped ||
        isDescClipped ||
        hasHiddenSkills ||
        hasHiddenRoles
      ) {
        setCanExpand(true);
      } else {
        setCanExpand(false);
      }
    }
  }, [title, description, skills, roles]);

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
          <h6 className={`fw-bold fs-4 mb-0`}>{creator.name}</h6>
          <small className={styles.creatorLabel}>Project Creator</small>
        </div>
      </div>

      <h4
        className={`fw-bolder mb-2 ${isExpanded ? styles.projectTitleExpanded : styles.projectTitleCollapsed}`}
        ref={titleRef}
      >
        {title || "New Team"}
      </h4>
      <p
        className={`mb-3 fw-normal ${isExpanded ? styles.descriptionExpanded : styles.descriptionCollapsed}`}
        ref={descRef}
      >
        {description}
      </p>

      {/* hackathon name & date */}
      <div className="d-flex align-items-center  gap-5 flex-wrap mb-4">
        <div className={`d-flex align-items-center gap-2 ${styles.metaText}`}>
          <PrizeIcon size={20} color="var(--color-primary-dark)" />
          <span>{hackathonName}</span>
        </div>
        <div className={`d-flex align-items-center gap-2 ${styles.metaText}`}>
          <CalenderIcon />
          <span className="text-uppercase">{dateRange}</span>
        </div>
      </div>

      {/* required roles */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-2 text-dark fw-bold fs-5">
          <CirclesIcon />
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
          <CodeIcon color="var(--color-primary-dark)" />
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

      {/* show more part */}

      {canExpand && (
        <div className="d-flex justify-content-start mt-2 mb-4">
          <button
            type="button"
            className={`btn p-0 border-0 ${styles.readMoreContainer}`}
            onClick={() => setIsExpanded(!isExpanded)}>

            {isExpanded ? (
              <span className={styles.toggleText}>
                Show Less
                <ChevronIconUp />
              </span>
            ) : (
              <span className={styles.toggleText}>
                Show Full Project Details ... <ChevronIconDown />
              </span>
            )}
          </button>
        </div>
      )}

      {/* Card Footer*/}
      <div className="mt-2">
        <div className="d-flex align-items-center gap-5 mb-3 pt-3 border-top">
          <div
            className={`d-flex align-items-center gap-2 ${styles.bottomStat}`}
          >
            <TeamIcon size={20} />
            <span>Team of {maxTeamSize}</span>
          </div>
          <div
            className={`d-flex align-items-center gap-2 ${styles.bottomStat}`}
          >
            <HeartIcon color="red" />
            <span>{interestedCount} interested</span>
          </div>
        </div>

        <CustomButton
          variant="primary"
          size="sm"
          className="w-100"
          onClick={onInterestToggle}
        >
          <HeartIcon color="var(--color-white)"></HeartIcon>
          <span>I'm Interested</span>
        </CustomButton>
      </div>
    </div>
  );
}

export default ProjectCard;
