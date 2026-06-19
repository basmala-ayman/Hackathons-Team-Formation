import styles from "./HackathonCard.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useHackathonInterest from "../../hooks/useHackathonInterest";
import CustomButton from "../../../../shared/CustomButton/CustomButton";
import defaultHackathonImg from "../../../../assets/defaultHackathonImg.png";
import { BadgeIcon, HeartIcon } from "../../../../assets/Icons";
import {
  PrizeIcon,
  CalenderIcon,
  LocationIcon,
  LevelIcon,
} from "../../../../assets/Icons";

function HackathonCard({ hackathon }) {
  const maxCapacity = 30;
  const {
    id,
    title,
    prizeAmount = 0,
    status,
    interestCount = 0,
    userCreated = false,
  } = hackathon;
  // const navigate = useNavigate();
  const { registerInterest, loading } = useHackathonInterest();
  const progressPercentage = Math.min((interestCount / maxCapacity) * 100, 100);

  const handleInterest = async () => {
    if (loading) return; // prevent double click
    try {
      const response = await registerInterest(id);
      console.log(response.message);

      toast.success("Interest submitted");
    } catch (error) {
      const backendMessage = error.message;

      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.log(error);
    }
  };

  return (
    <div className={`${styles.hackathonCard} d-flex flex-column rounded-4 p-3`}>
      {/* Dynamic Badge (Absolutely positioned over top-right border) */}
      <div
        className={`d-flex align-items-center gap-1 ${styles.badge} ${userCreated ? styles.userCreatedBadge : styles.officialBadge}`}
      >
        <BadgeIcon />
        {userCreated ? "USER CREATED" : "OFFICIAL"}
      </div>

      {/* Interest Level Progress (Now takes full advantage of the left space) */}
      <div className={styles.interestSection}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div
            className={`d-flex align-items-center gap-2 ${styles.interestLabel}`}
          >
            <HeartIcon color="var(--color-primary-dark)" size="16" />
            Interest Level
          </div>
          <div className={styles.interestCount}>
            {interestCount}/{maxCapacity}
          </div>
        </div>
        <div className={styles.progressBarContainer}>
          <div
            className={
              progressPercentage > 80
                ? styles.progressBarFillDanger
                : styles.progressBarFill
            }
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {progressPercentage > 80 && (
          <div className={styles.fillingFastText}>● Filling up fast!</div>
        )}
      </div>

      {/* Image */}
      <div className={`${styles.hackathonImg} text-center mt-3 mb-3`}>
        <img src={defaultHackathonImg} alt={title} className="w-100 rounded" />
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
        {prizeAmount !== 0 && (
          <div className="d-flex align-items-start gap-3 mb-2">
            <div className={styles.iconCover}>
              <PrizeIcon size={16} color="var(--color-primary-dark)" />
            </div>
            <div className="d-flex flex-column">
              <span className={styles.detailLabel}>Prize Pool</span>
              <span className={styles.detailValue}>$ {prizeAmount}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mt-auto">
        <CustomButton
          variant="primary"
          size="sm"
          className="flex-fill rounded-4 w-100"
          onClick={handleInterest}
        >
          {loading ? "Submitting..." : "I'm Interested"}
        </CustomButton>
      </div>
    </div>
  );
}

export default HackathonCard;
