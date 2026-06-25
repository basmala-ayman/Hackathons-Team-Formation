import TeamCard from "../";
import { RaiseUpIcon } from "../../../assets/Icons"; // Adjust path if needed

function InvitationsList({ invitations, acceptingId, rejectingId, onAccept, onReject }) {
  return (
    <>
      {invitations.map((invitation) => {
        const targetTeam = invitation.team;

        if (!targetTeam) return null;

        return (
          <div key={invitation.invitationId} className="mb-5 p-4 border rounded bg-white shadow-sm">
            <div className="mb-3">
              <h4 className="m-0 fw-bold fs-2 mb-4" style={{ color: "var(--color-very-dark-purple)" }}>
                Invitation to join: {targetTeam.teamName}
              </h4>
              <p className="mt-3 mb-0 fs-3 d-flex gap-2">
                <RaiseUpIcon />
                <span>Hackathon Name: </span>
                <strong className="text-dark">{targetTeam.hackathonName}</strong>
              </p>
              {targetTeam.description && (
                <p className="text-secondary mt-1 mb-0 fs-5">
                  {targetTeam.description}
                </p>
              )}
            </div>

            <TeamCard
              members={targetTeam.currentMembers}
              isAcceptLoading={acceptingId === invitation.invitationId}
              isRejectLoading={rejectingId === invitation.invitationId}
              onAccept={() => onAccept({
                isOwner: false,
                invitationId: invitation.invitationId,
                teamName: targetTeam.teamName,
              })}
              onReject={() => onReject({
                isOwner: false,
                invitationId: invitation.invitationId,
              })}
              acceptLabel="Accept to Join"
            />
          </div>
        );
      })}
    </>
  );
}

export default InvitationsList;