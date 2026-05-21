import styles from "./HackathonCard.module.css";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import defaultHackathonImg from "../../../../assets/defaultHackathonImg.png";
import {BadgeIcon , HeartIcon} from "../../../../assets/Icons"
import {
  PrizeIcon,
  CalenderIcon,
  LocationIcon,
  LevelIcon,
} from "../../../../assets/Icons";
function HackathonCard({ hackathon }) {
  const maxCapacity = 30;
  const {
    title,
    prizeAmount,
    status,
    interestCount = 0,
    userCreated = false,
  } = hackathon;
  const navigate = useNavigate();

  const progressPercentage = Math.min((interestCount / maxCapacity) * 100, 100);

  return (
   <div className={`${styles.hackathonCard} d-flex flex-column rounded-4 p-3`}>
      
      {/* Dynamic Badge (Absolutely positioned over top-right border) */}
      <div className={`d-flex align-items-center gap-1 ${styles.badge} ${userCreated ? styles.userCreatedBadge : styles.officialBadge}`}>
       <BadgeIcon/>
        {userCreated ? "USER CREATED" : "OFFICIAL"}
      </div>
      
      {/* Interest Level Progress (Now takes full advantage of the left space) */}
      <div className={styles.interestSection}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div className={styles.interestLabel}>♡ Interest Level</div>
          <div className={styles.interestCount}>
            {interestCount}/{maxCapacity}
          </div>
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
      </div>

      {/* Image */}
      <div className={`${styles.hackathonImg} text-center mt-3 mb-3`}>
        <img
          src={defaultHackathonImg}
          alt={title}
          className="w-100 rounded"
        />
      </div>

      {/* Title */}
      <h4 className="fw-semibold mt-2 mb-3 fs-2">{title}</h4>

      {/* Hackathon Details */}
      <div className={`${styles.hackathonDetails} mb-4`}>
        {/* Event Date */}
        {/* <div className="d-flex align-items-start gap-3 mb-3">
          <CalenderIcon />
          <div className="d-flex flex-column">
            <span className={styles.detailLabel}>Event Date</span>
            <span className={styles.detailValue}>{date}</span>
          </div>
        </div> */}
        
        {/* Prize Pool */}
        <div className="d-flex align-items-start gap-3 mb-2">
          <PrizeIcon color="var(--color-primary-dark)" />
          <div className="d-flex flex-column">
            <span className={styles.detailLabel}>Prize Pool</span>
            <span className={styles.detailValue}>{prizeAmount}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mt-auto">
        <CustomButton
          variant="primary"
          size="sm"
          className="flex-fill rounded-4"
          onClick={() => navigate("/")}
        >
          I'm Interested
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
