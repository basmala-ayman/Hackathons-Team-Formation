import TeamCard from "../TeamCard/TeamCard";
import { EmptyState } from "../../../shared/States";

function MyTeamsList({ teams, acceptingId, rejectingId, onAccept, onReject, styles }) {

  const teamsWithPendingRecs = teams.filter((team) => {

    //filter to check the number of 
    const pendingRecs = (team.recommendations || []).filter(
      (rec) => rec.status === "PENDING"
    );
    return pendingRecs.length > 0;
  });

  if (teamsWithPendingRecs.length === 0) {
    return <EmptyState message="No Recommendations found yet" />;
  }

  return (
    <>
      {teamsWithPendingRecs.map((team) => {
        // We filter again here just to pass the exact pending recs to the UI
        const recs = (team.recommendations || []).filter(
          (rec) => rec.status === "PENDING"
        );

        return (
          <div key={team.teamId} className="mb-5 p-4 border rounded bg-white shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3">
              <h4 className="m-0 fw-bold fs-2" style={{ color: "var(--color-very-dark-purple)" }}>
                Member Recommendations for Team {team.teamName}:
              </h4>
              <span className={`badge px-3 py-2 ${styles.optionsBadge}`}>
                {recs.length} Option{recs.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="d-flex flex-column gap-4">
              {recs.map((rec, index) => (
                <div key={rec.id}>
                  <h6 className="text-secondary mb-2 fw-bold d-flex align-items-center gap-2">
                    <span className="bg-light text-dark px-2 py-1 rounded fs-4">
                      Option {index + 1}
                    </span>
                    {rec.matchLevel && (
                      <span className="text-muted fs-4 fw-normal">
                        • {rec.matchLevel} Match
                      </span>
                    )}
                  </h6>
                  <TeamCard
                    members={rec.members}
                    isAcceptLoading={acceptingId === rec.id}
                    isRejectLoading={rejectingId === rec.id}
                    onAccept={() => onAccept({ isOwner: true, recommendationId: rec.id })}
                    onReject={() => onReject({ isOwner: true, recommendationId: rec.id })}
                    acceptLabel="Accept Team"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MyTeamsList;