import StatusBadge from "./StatusBadge";
import CustomButton from "../../../shared/CustomButton/CustomButton";

function MemberProgressCard({ member }) {
  const techRoles = member.techRoles || [];
  const skills = member.skills || [];
  return (
    <div
      className="card shadow-sm mb-3"
      style={{
        backgroundColor: "var(--color-white)",
        border: "0.1rem solid var(--color-light-gray)",
        borderRadius: "0.8rem",
      }}
    >
      <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 p-4">
        <div>
          <h5
            className="mb-2 fw-bold"
            style={{
              color: "var(--color-very-dark-purple)",
              fontSize: "var(--fs-regular)",
              fontFamily: "var(--font-family-inter)",
            }}
          >
            {member.name}
          </h5>
<p className="mb-2" style={{ color: 'var(--color-dark-gray)', fontSize: 'var(--fs-small)' }}>
              {member.email}
            </p>
          <div className="d-flex gap-3">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none"
                style={{
                  color: "var(--color-primary-dark)",
                  fontSize: "var(--fs-small)",
                }}
              >
                LinkedIn
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none"
                style={{
                  color: "var(--color-primary-dark)",
                  fontSize: "var(--fs-small)",
                }}
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        <div>
          <StatusBadge status={member.status} />
        </div>
      </div>
    </div>
  );
}

export default MemberProgressCard;
