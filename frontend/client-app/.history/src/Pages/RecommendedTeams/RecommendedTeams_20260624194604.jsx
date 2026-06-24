import styles from "./RecommendedTeams.module.css";
import toast from "react-hot-toast";
import TeamCard from "./TeamCard/TeamCard";
import { useNavigate , useLocation  } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext/useAuth";
import useRecommendations from "./hooks/useRecommendations";
import {
  acceptRecommendation,
  rejectRecommendation,
  respondToInvitation,
} from "../../services/recommendationService";
import { RaiseUpIcon } from "../../assets/Icons";
import { LoadingState, EmptyState } from "../../shared/States";

function RecommendedTeams() {
  // const navigate = useNavigate();
   const location = useLocation();
    const initialTab = location.state?.initialTab || "myTeams";

  // 'myTeams' | 'invitations'
  const [activeTab, setActiveTab] = useState(initialTab);
  const { recommendations, loading, error, refetchRecommendations } =
    useRecommendations();
  const [acceptingId, setAcceptingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);

  const displayedTeams =
    activeTab === "invitations" ? recommendations.myTeams : recommendations.join;

  const handleAccept = async ({
    isOwner,
    recommendationId,
    invitationId,
    teamName,
  }) => {
    const idToLoad = isOwner ? recommendationId : invitationId;
    if (acceptingId === idToLoad) return;

    try {
      setAcceptingId(idToLoad);

      if (isOwner) {
        await acceptRecommendation(recommendationId);
        toast.success("Team accepted and invitations are sent");
      } else {
        toast.success(
          `Congrats for joining the team and you are part of team ${teamName} now`,
        );
        await respondToInvitation(invitationId, "ACCEPT");
      }
      await refetchRecommendations();
    } catch (error) {
      toast.error("Failed to Accept");
      console.error(error);
    } finally {
      setAcceptingId(null);
    }
  };

  const handleReject = async ({ isOwner, recommendationId, invitationId }) => {
    const idToLoad = isOwner ? recommendationId : invitationId;
    if (rejectingId === idToLoad) return;

    try {
      setRejectingId(idToLoad);

      if (isOwner) {
        await rejectRecommendation(recommendationId);
      } else {
        await respondToInvitation(invitationId, "REJECT");
      }
      toast.success("Rejected successfully");
      await refetchRecommendations();
    } catch (error) {
      toast.error("Failed to Reject");
      console.error(error);
    } finally {
      setRejectingId(null);
    }
  };
  if (loading) {
    return <LoadingState message="Loading recommendations..." />;
  }

  if (error) {
    return <EmptyState message="No Recommended Teams yet" />;
  }

  return (
    <div className={`min-vh-100 ${styles.pageBackground}`}>
      <div className={`container py-5`}>
        <h3
          className="fw-bolder"
          style={{
            color: "var(--color-very-dark-purple)",
            fontSize: "var(--fs-h3)",
          }}
        >
          Recommended Teams
        </h3>
        <p
          style={{
            color: "var(--color-dark-gray)",
            fontSize: "var(--fs-regular)",
          }}
        >
          Find the perfect team to join and collaborate on exciting hackathon
          projects
        </p>

        {/* tabs */}
        <div className="d-flex  my-5 flex-wrap">
          <button
            type="button"
            className={`px-5 py-2 fs-3 ${
              activeTab === "owned" ? styles.activeTab : styles.inactiveTab
            }`}
            onClick={() => setActiveTab("owned")}
          >
            My Teams
          </button>

          <button
            type="button"
            className={`px-5 py-2 fs-3 ${
              activeTab === "suggested" ? styles.activeTab : styles.inactiveTab
            }`}
            onClick={() => setActiveTab("suggested")}
          >
            Invitations
          </button>
        </div>

        {displayedTeams.length > 0 ? (
          displayedTeams.map((team) => {
            //my teams
            if (activeTab === "owned") {
              const recs = (team.recommendations || []).filter(
                (rec) => rec.status === "PENDING"
              );

              if (recs.length === 0) {
                return (
                  <>
                    <EmptyState message="No Recommendations found yet" />;
                  </>
                );
              }

              // Grouped view for teams with recommendations
              return (
                <div
                  key={team.teamId}
                  className="mb-5 p-4 border rounded bg-white shadow-sm"
                >
                  <div className="d-flex justify-content-between align-items-center mb-4  pb-3">
                    <h4
                      className="m-0 fw-bold fs-2"
                      style={{ color: "var(--color-very-dark-purple)" }}
                    >
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
                          onAccept={() =>
                            handleAccept({
                              isOwner: true,
                              recommendationId: rec.id,
                            })
                          }
                          onReject={() =>
                            handleReject({
                              isOwner: true,
                              recommendationId: rec.id,
                            })
                          }
                          acceptLabel="Accept Team"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            //invitations
            if (activeTab === "suggested") {
              const invitation = team;
              const targetTeam = invitation.team;

              if (!targetTeam) return null;

              return (
                <div
                  key={invitation.invitationId}
                  className="mb-5 p-4 border rounded bg-white shadow-sm"
                >
                  <div className="mb-3">
                    <h4
                      className="m-0 fw-bold fs-2 mb-4"
                      style={{ color: "var(--color-very-dark-purple)" }}
                    >
                      Invitation to join: {targetTeam.teamName}
                    </h4>
                    <p className="mt-3 mb-0 fs-3 d-flex gap-2">
                      <RaiseUpIcon />
                      <span>Hackathon Name: </span>
                      <strong className="text-dark">
                        {targetTeam.hackathonName}
                      </strong>
                    </p>
                    {targetTeam.description && (
                      <p className="text-secondary mt-1 mb-0 fs-5">
                        {targetTeam.description}
                      </p>
                    )}
                  </div>

                  {/* Team Members Card */}

                  <TeamCard
                    members={targetTeam.currentMembers}
                    isAcceptLoading={acceptingId === invitation.invitationId}
                    isRejectLoading={rejectingId === invitation.invitationId}
                    onAccept={() =>
                      handleAccept({
                        isOwner: false,
                        invitationId: invitation.invitationId,
                        teamName: targetTeam.teamName,
                      })
                    }
                    onReject={() =>
                      handleReject({
                        isOwner: false,
                        invitationId: invitation.invitationId,
                      })
                    }
                    acceptLabel="Accept to Join"
                  />
                </div>
              );
            }
          })
        ) : (
          <EmptyState message="No Teams found yet" />
        )}
      </div>
    </div>
  );
}
export default RecommendedTeams;
