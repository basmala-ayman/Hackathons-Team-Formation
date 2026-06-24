import styles from "./TeamCard.module.css";
import { TeamIcon, RaiseUpIcon } from "../../../assets/Icons";
import defaultProfile from "../../../assets/defaultProfile.jpg";
import CustomButton from "../../../shared/CustomButton/CustomButton";
function TeamCard({
  // teamName,
  // hackathonName,
  // description,
  members = [],
  maxMembers = 4,
  acceptLabel = "Accept the Team",
  isLoading = false,
  onAccept,
  onView,
}) {
  const currentMembersCount = members.length;

  return (
    <div className={`p-4 mb-4 border rounded ${styles.cardWrapper}`}>
      {/* <h4 className={`fw-bold mb-0 ${styles.teamTitle}`}>{teamName}</h4>
      <div
        className={`d-flex align-items-center gap-2 my-3 ${styles.hackathonTag}`}
      >
        <RaiseUpIcon />
        <span>{hackathonName}</span>
      </div> */}

      {/* {description && (
        <p className={`mb-4 ${styles.description}`}>{description}</p>
      )} */}
     <div className="mb-4">
        <div
          className={`d-flex align-items-center gap-2 mb-2 ${styles.sectionLabel}`}
        >
          <TeamIcon size="24" />
          <span>Team Members</span>
        </div>

        {/* Detailed Members List */}
        <div className="d-flex flex-column gap-3 mb-4 mt-3">
          {members.map((member, index) => {
            // Handle role formatting (array vs string)
            let displayRole = "Member";
            if (Array.isArray(member.role)) {
              displayRole = member.role.join(", ");
            } else if (typeof member.role === "string") {
              // Convert "CYBERSECURITY_ENGINEER" to "CYBERSECURITY ENGINEER"
              displayRole = member.role.replace(/_/g, " "); 
            }

            return (
              <div key={member.userId || index} className="d-flex align-items-center gap-3">
                <img
                  src={member.profilePicture || member.avatarUrl || defaultProfile}
                  alt={member.name || "Member"}
                  className="rounded-circle border"
                  style={{ width: "45px", height: "45px", objectFit: "cover" }}
                />
                <div className="d-flex flex-column">
                  <span className="fw-bold fs-5 text-dark m-0" style={{ lineHeight: "1.2" }}>
                    {member.name || "Unknown Member"}
                  </span>
                  <span className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {displayRole}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
    

          {/* Action Buttons*/}
          <div className="d-flex gap-2">
            
              <CustomButton
                variant="primary"
                size="sm"
                // className="w-100"
                onClick={onAccept}
                disabled={isLoading}
              >
                 {isLoading ? "Processing..." : acceptLabel}
              </CustomButton>
         
           
              <CustomButton
                variant="secondary"
                size="sm"
                // className={"w-100"}
                onClick={onView}
              >
                View Team
              </CustomButton>
          
          </div>
        </div>
      </div>
  );
}
export default TeamCard;
