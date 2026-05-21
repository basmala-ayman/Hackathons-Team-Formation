import styles from "./HackathonCard.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import defaultHackathonImg from '../../../../assets/defaultHackathonImg.png'
import {
  PrizeIcon,
  CalenderIcon,
  LocationIcon,
  LevelIcon
} from "../../../../assets/Icons";
function HackathonCard({ hackathon }) {
  const maxCapacity=30;
  const { title, prizeAmount, status ,interestCount=0, userCreated = false, } = hackathon;
  const navigate = useNavigate();

  const progressPercentage = Math.min((interestCount / maxCapacity) * 100, 100);
 
  return (
    <div
      className={`${styles.hackathonCard} d-flex flex-column  rounded-4 p-3 `}
    >
     
        
        {/* Dynamic Badge */}
        <div className={`${styles.badge} ${userCreated ? styles.userCreatedBadge : styles.officialBadge}`}>
          {userCreated ? "USER CREATED" : "OFFICIAL"}
        </div>
        {/* Interest Level Progress */}
      <div className={styles.interestSection}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div className={styles.interestLabel}>
            ♡ Interest Level
          </div>
          <div className={styles.interestCount}>{interestCount}/{maxCapacity}</div>
        </div>
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {progressPercentage > 80 && (
          <div className={styles.fillingFastText}>● Filling up fast!</div>
        )}

      <div className={`${styles.hackathonImg} text-center mt-5 mb-3`}>
        <img src={defaultHackathonImg} alt={title} className="w-100 rounded-top" />
      </div>

      <h4 className="fw-semibold mt-3 mb-3 fs-2">{title}</h4>

      <div className={`${styles.hackathonDetails}`}>
       <div className="d-flex align-items-start gap-3 mb-3">
          <CalenderIcon />
          <div className="d-flex flex-column">
            <span className={styles.detailLabel}>Event Date</span>
            <span className={styles.detailValue}>{date}</span>
          </div>
        </div>
        <div className="d-flex align-items-start gap-3 mb-2">
          <PrizeIcon color="var(--color-primary-dark)" />
          <div className="d-flex flex-column">
            <span className={styles.detailLabel}>Prize Pool</span>
            <span className={styles.detailValue}>{prizeAmount}</span>
          </div>
        </div>
      </div>


      <div className="d-flex gap-2 mt-auto">
        <CustomButton
          variant="primary"
          size="sm"
          className="flex-fill rounded-4"
          onClick={() => navigate("/")}
        >
          Create a team
        </CustomButton>
        <CustomButton
          variant="secondary"
          size="sm"
          className="flex-fill rounded-4"
          onClick={() => navigate("/")}
        >
          View Details
        </CustomButton>
      </div>
    </div>
  );
}

export default HackathonCard;
