import styles from "./TeamCard.module.css";
import { TeamIcon } from "../../../assets/Icons";
import defaultProfile from "../../../assets/defaultProfile.jpg";
import CustomButton from "../../../shared/CustomButton/CustomButton";

const BACKEND_URL =
  import.meta.env.VITE_API_BASE_URL?.replace("/api/v1", "") ||
  "http://localhost:3000";

function TeamCard({
  members = [],
  isAcceptLoading,
  isRejectLoading,
  onAccept,
  onReject,
  acceptLabel = "Accept",
}) {
  const formatRole = (role) => {
    const text = role.replace(/_/g, " ").toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const getAvatar = (member) => {
    const picture = member.profilePicture || member.avatarUrl;

    if (!picture) return defaultProfile;

    if (
      picture.startsWith("http") ||
      picture.startsWith("blob:")
    ) {
      return picture;
    }

    return `${BACKEND_URL}${picture}`;
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

        <div className={`mb-5 mt-4 ${styles.membersContainer}`}>
          {members.map((member) => {
            console.log(member);
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
                  src={getAvatar(member)}
                  alt={member.name || "Member"}
                  className={styles.avatarImg}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultProfile;
                  }}
                />

                <div className="d-flex flex-column">
                  <span
                    className="fw-bold fs-4 text-dark m-0"
                    style={{ lineHeight: "1.2" }}
                  >
                    {member.name || "Unknown Member"}
                  </span>

                  <span className="text-muted fs-4">
                    {displayRole}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="d-flex gap-2">
          <CustomButton
            variant="primary"
            size="sm"
            onClick={onAccept}
            disabled={isAcceptLoading}
          >
            {isAcceptLoading ? "Accepting..." : acceptLabel}
          </CustomButton>

          <CustomButton
            variant="secondary"
            size="sm"
            onClick={onReject}
            disabled={isRejectLoading}
          >
            {isRejectLoading ? "Rejecting..." : "Reject"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;