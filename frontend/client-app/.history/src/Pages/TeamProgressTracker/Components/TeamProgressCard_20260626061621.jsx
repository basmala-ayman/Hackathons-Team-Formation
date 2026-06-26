import React from 'react'
import CustomButton from '../../../shared/CustomButton/CustomButton'
import { RaiseUpIcon ,ElectricIcon, TeamMeetIcon} from '../../../assets/Icons'
import MemberProgressCard from './MemberProgressCard'
function TeamProgressCard({ team, onOpenModal }) {
  return (
 <div
      className="bg-white rounded p-4 p-md-5 mb-5 shadow-sm"
      style={{ border: "0.1rem solid var(--color-light-gray)" }}
    >
      <div
        className="mb-4 border-bottom pb-2"
        style={{ borderColor: "var(--color-light-gray) !important" }}
      >
        <h2
          className="fw-bolder mb-5"
          style={{
            color: "var(--text-color)",
            fontSize: "var(--fs-h4)",
          }}
        >
          {team.teamName}
        </h2>
        <p
          className="m-0 d-flex align-items-center gap-2"
          style={{
            color: "var(--color-dark-gray)",
            fontSize: "var(--fs-regular)",
          }}
        >
          <span>
            <RaiseUpIcon />
          </span>
          {team.hackathonName}
        </p>
        
        {team.description && (
          <p
            className="mt-3 mb-0 d-flex align-items-center gap-2"
            style={{
              color: "var(--color-dark-gray)",
              fontSize: "var(--fs-regular)",
              lineHeight: "1.5",
            }}
          >
            <span>
              <ElectricIcon />
            </span>
            {team.description}
          </p>
        )}
      </div>

      {/* Member List Section */}
      <div className="mb-2">
        <p className="d-flex align-items-start gap-3">
          <TeamMeetIcon />
          <span
            className="mb-3 fw-bold"
            style={{
              color: "var(--color-primary-dark)",
              fontSize: "var(--fs-regular)",
            }}
          >
            Member Progress
          </span>
        </p>

        <div className="d-flex flex-column">
          {team.members.length > 0 ? (
            team.members.map((member) => (
              <MemberProgressCard key={member.id} member={member} />
            ))
          ) : (
            <p
              style={{
                color: "var(--color-gray)",
                fontSize: "var(--fs-small)",
              }}
            >
              No members found for this team.
            </p>
          )}
        </div>
      </div>

      {/* Team Action Buttons Section */}
     {team.buttonDisplayed && (
        <div className="d-flex justify-content-end gap-3 pt-1">
          <CustomButton
            variant="secondary"
            size="sm"
            onClick={() => onOpenModal("remake", team)}
          >
            Find More Teammates
          </CustomButton>

          <CustomButton
            variant="primary"
            size="sm"
            onClick={() => onOpenModal("satisfied", team)}
          >
            Finalize Team
          </CustomButton>
        </div>
      )}
    </div>
  )
}

export default TeamProgressCard
