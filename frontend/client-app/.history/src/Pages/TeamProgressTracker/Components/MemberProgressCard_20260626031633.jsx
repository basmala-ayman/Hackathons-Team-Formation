import StatusBadge from "./StatusBadge";
import CustomButton from "../../../shared/CustomButton/CustomButton";

function MemberProgressCard({ member }) {
  const techRoles = member.techRoles || [];
  const skills = member.skills || [];
  return (
    <div 
      className="card shadow-sm mb-3" 
      style={{ 
        backgroundColor: 'var(--color-white)',
        border: '0.1rem solid var(--color-light-gray)',
        borderRadius: '0.8rem'
      }}
    >
      <div className="card-body p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4">
          
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-3 mb-2">
              <h5 
                className="mb-0 fw-bold" 
                style={{ color: 'var(--color-very-dark-purple)', fontSize: 'var(--fs-regular)' }}
              >
                {member.name} {member.isOwner && <span className="fs-6">(Owner)</span>}
              </h5>
              <StatusBadge status={member.status} />
            </div>
            
            <p className="mb-2" style={{ color: 'var(--color-dark-gray)', fontSize: 'var(--fs-small)' }}>
              {member.email}
            </p>
            
            <div className="d-flex gap-3 mb-3">
              {member.linkedinUrl && (
                <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="text-decoration-none fw-bold" style={{ color: 'var(--color-primary-dark)', fontSize: 'var(--fs-small)' }}>
                  LinkedIn
                </a>
              )}
              {member.githubUrl && (
                <a href={member.githubUrl} target="_blank" rel="noreferrer" className="text-decoration-none fw-bold" style={{ color: 'var(--color-primary-dark)', fontSize: 'var(--fs-small)' }}>
                  GitHub
                </a>
              )}
            </div>

            {/* Roles & Skills Tags */}
            <div className="d-flex flex-wrap gap-2">
              {/* Render Roles in Purple */}
              {techRoles.map((role, idx) => (
                <span 
                  key={`role-${idx}`} 
                  className="badge" 
                  style={{ backgroundColor: 'var(--color-primary-light-2)', color: 'var(--color-very-dark-purple)', fontSize: 'var(--fs-v-small)', fontWeight: '500' }}
                >
                  {role}
                </span>
              ))}
              
              {/* Render Skills in Gray/Neutral */}
              {skills.map((skill, idx) => (
                <span 
                  key={`skill-${idx}`} 
                  className="badge" 
                  style={{ backgroundColor: 'var(--color-register-bg)', color: 'var(--color-dark-gray)', fontSize: 'var(--fs-v-small)', fontWeight: '500' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MemberProgressCard;
