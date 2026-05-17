import styles from "./TeamCard.module.css";
import { TeamIcon } from "../../../assets/Icons";
import defaultProfile from '../../../assets/defaultProfile.png'
import CustomButton from '../../../shared/CustomButton/CustomButton'
function TeamCard({
  teamName,
  hackathonName,
  description,
  members = [],
  maxMembers = 4,
  onAccept,
  onView,
}) {
  const currentMembersCount = members.length;
  const progressPercentage = (currentMembersCount / maxMembers) * 100;
  return (
    <div className={`p-4 mb-4 ${styles.cardWrapper}`}>
      <h4 className={`fw-bold mb-0 ${styles.teamTitle}`}>{teamName}</h4>
      <div
        className={`d-flex align-items-center gap-2 mb-3 ${styles.hackathonTag}`}
      >
        {/* <HiOutlineTrendingUp size={16} /> */}
        <span>{hackathonName}</span>
      </div>

      {description && (
        <p className={`text-secondary mb-4 ${styles.description}`}>
          {description}
        </p>
      )}

      {/* Avatar Stack */}
        <div className="d-flex align-items-center">
          <div className={styles.avatarStack}>
            {members.slice(0, 3).map((member, index) => (
              <img 
                key={index} 
                src={member.avatarUrl || defaultProfile} 
                alt={member.name || 'Member'} 
                className={styles.avatarImg}
              />
            ))}
            {currentMembersCount > 3 && (
              <div className={styles.avatarCountCircle}>
                +{currentMembersCount - 3}
              </div>
            )}
          </div>
        </div>

        {/* Team Progress Bar */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-1 small fw-medium text-secondary">
          <span>Team Progress</span>
          <span className={styles.progressText}>{currentMembersCount}/{maxMembers} Members</span>
        </div>
        <div className="progress" style={{ height: '6px', backgroundColor: "var(--color-white)" }}>
          <div 
            className="progress-bar" 
            role="progressbar" 
            style={{ width: `${progressPercentage}%`, backgroundColor: "var(--color-primary-dark)" }}
            aria-valuenow={progressPercentage} 
            aria-valuemin="0" 
            aria-valuemax="100"
          ></div>
        </div>


        {/* Action Buttons*/}
      <div className="row g-3 my-2">
        <div className="col-9">
          <CustomButton 
            variant="primary"
            size="sm" 
            className="w-100 py-2 fw-medium text-white"
            onClick={onAccept}
          >
            Accept the Team
          </CustomButton>
        </div>
        <div className="col-3">
          <CustomButton 
            variant="secondary" 
            size="sm" 
            className={`w-100 py-2 fw-medium ${styles.btnViewCustom}`}
            onClick={onView}
          >
            View Team
          </CustomButton>
        </div>
      </div>
      </div>



    </div>
  );
}

export default TeamCard;
