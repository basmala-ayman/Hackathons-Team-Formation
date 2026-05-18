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
  

);
}

export default TeamCard;
