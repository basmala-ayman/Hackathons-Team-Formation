import styles from "./TeamCard.module.css";
import { TeamIcon, RaiseUpIcon } from "../../../assets/Icons";
import defaultProfile from "../../../assets/defaultProfile.jpg";
import CustomButton from "../../../shared/CustomButton/CustomButton";
function TeamCard({
  members = [],
  acceptLabel = "Accept",
  rejectLabel = "Reject",
  isLoading = false,
  onAccept,
  onReject,
}) {
  const formatRole = (role) => {
    const text = role.replace(/_/g, " ").toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className={`p-4 mb-4 border rounded ${styles.cardWrapper}`}>
      <div className="mb-4">
        <div
          className={`d-flex align-items-center gap-2 mb-3 ${styles.sectionLabel}`}
        >
          <TeamIcon size="24" />
          <span>Team Members</span>
        </div>

        {/* Detailed Members  */}
        <div className={`mb-5 mt-4 ${styles.membersContainer}`}>
          {members.map((member) => {
            const displayRole = Array.isArray(member.role)
              ? member.role.map(formatRole).join(", ")
              : member.role
                ? formatRole(member.role)
                : "Member";

            return (
              <div
                key={member.userId}
                className={`d-flex align-items-center gap-3 ${styles.memberItem}`}
              >
                <img
                  src={
                    member.profilePicture || member.avatarUrl || defaultProfile
                  }
                  alt={member.name || "Member"}
                  className="rounded-circle border"
                  style={{ width: "45px", height: "45px", objectFit: "cover" }}
                />
                <div className="d-flex flex-column">
                  <span
                    className="fw-bold fs-4 text-dark m-0"
                    style={{ lineHeight: "1.2" }}
                  >
                    {member.name || "Unknown Member"}
                  </span>
                  <span className="text-muted fs-4">{displayRole}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons*/}
        <div className="d-flex gap-3">
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
            onClick={onReject}
          >
            View Team
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
export default TeamCard;
