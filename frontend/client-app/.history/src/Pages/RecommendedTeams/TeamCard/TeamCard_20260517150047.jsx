import styles from "./TeamCard.module.css";
import { TeamIcon } from "../../../assets/Icons";
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
    

</div>
);
}

export default TeamCard;
