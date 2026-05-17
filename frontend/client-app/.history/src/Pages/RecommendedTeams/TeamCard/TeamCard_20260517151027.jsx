import styles from "./TeamCard.module.css";
import { TeamIcon } from "../../../assets/Icons";
import defaultProfile from '../../../assets/defaultProfile'
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
        <HiOutlineTrendingUp size={16} />
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
                src={member.avatarUrl || {defaultProfile}} 
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
    </div>
  );
}

export default TeamCard;
