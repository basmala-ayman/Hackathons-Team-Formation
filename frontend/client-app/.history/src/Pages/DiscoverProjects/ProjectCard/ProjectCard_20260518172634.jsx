import styles from './ProjectCard.module.css'
import { useState } from 'react';
function ProjectCard({ 
  creator, 
  title, 
  description, 
  hackathonName, 
  dateRange, 
  skills = [], 
  roles=[],
  maxTeamSize = 4, 
  interestedCount = 0,
  onInterestToggle 
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const visibleSkills = isExpanded ? skills : skills.slice(0, 3);
  const hasHiddenSkills = skills.length > 3;
  const visibleRoles = isExpanded ? roles : roles.slice(0, 3);
  const hasHiddenRoles = roles.length > 3;
  return (
    <div className={`p-4 d-flex flex-column justify-content-between ${styles.cardWrapper}`}>
      <div>
        {/* Creator Header Profile */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-3">
            <img src={creator.avatarUrl} alt={creator.name} className={styles.creatorAvatar} />
            <div>
              <h6 className={`fw-bold mb-0 ${styles.creatorName}`}>{creator.name}</h6>
              <small className={styles.creatorLabel}>Project Creator</small>
            </div>
          </div>
          
          {/* 2. Toggle Expansion Button */}
          <button 
            type="button" 
            className={`btn btn-link text-decoration-none ${styles.toggleBtn}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>Show Less <HiChevronUp size={18} /></>
            ) : (
              <>Show More <HiChevronDown size={18} /></>
            )}
          </button>
        </div>

        {/* Project Information */}
        <h4 className={`fw-bolder mb-2 ${styles.projectTitle}`}>{title}</h4>
        
        {/* 3. Conditional Truncation Class applied dynamically */}
        <p className={`mb-3 ${isExpanded ? styles.descriptionExpanded : styles.descriptionCollapsed}`}>
          {description}
        </p>

        {/* Hackathon Details Line */}
        <div className="d-flex align-items-center gap-4 flex-wrap mb-4">
          <div className={`d-flex align-items-center gap-2 ${styles.metaText}`}>
            <HiOutlineTrophy className={styles.purpleIcon} size={20} />
            <span>{hackathonName}</span>
          </div>
          <div className={`d-flex align-items-center gap-2 ${styles.metaText}`}>
            <HiOutlineCalendar className={styles.purpleIcon} size={20} />
            <span className="text-uppercase">{dateRange}</span>
          </div>
        </div>

        {/* Required Skills Segment */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-2 text-dark fw-bold fs-5">
            <HiOutlineAdjustmentsHorizontal className={styles.purpleIcon} size={22} />
            <span className={styles.skillsSectionTitle}>Required Skills</span>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            {visibleSkills.map((skill, index) => (
              <span key={index} className={styles.skillPill}>
                #{skill}
              </span>
            ))}
            
            {/* Show a helpful indicator count if collapsed */}
            {!isExpanded && hasHiddenSkills && (
              <span className={styles.moreSkillsIndicator}>
                +{skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Statistics & Button */}
      <div className="mt-2">
        <div className="d-flex justify-content-between align-items-center mb-3 pt-3 border-top">
          <div className={`d-flex align-items-center gap-2 ${styles.bottomStat}`}>
            {/* <HiOutlineUsers size={20} /> */}
            <span>Team of {maxTeamSize}</span>
          </div>
          <div className={`d-flex align-items-center gap-2 ${styles.bottomStat}`}>
            {/* <HiOutlineHeart size={20} className="text-danger" /> */}
            <span>{interestedCount} interested</span>
          </div>
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
  )
}

export default ProjectCard;
