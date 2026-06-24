import styles from "./RecommendedTeams.module.css";
import toast from "react-hot-toast";
import TeamCard from "./TeamCard/TeamCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext/useAuth";
import useRecommendations from "./hooks/useRecommendations";
import {
  acceptRecommendation,
  rejectRecommendation,
  respondToInvitation,
} from "../../services/recommendationService";
import { LoadingState, EmptyState } from "../../shared/States";

function RecommendedTeams() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // 'owned' | 'suggested'
  const [activeTab, setActiveTab] = useState("owned");
  const { recommendations, loading, error } = useRecommendations();
  const [loadingId, setLoadingId] = useState(null); 

  const displayedTeams =
    activeTab === "owned" ? recommendations.myTeams : recommendations.join;

  const handleAccept = async ({ isOwner, recommendationId, invitationId }) => {
    if (loadingId === recommendationId) return;

    try {
      setLoadingId(recommendationId);

      if (isOwner) {
        await acceptRecommendation(recommendationId);
      } else {
        await respondToInvitation(invitationId, "ACCEPT");
      }

      toast.success("Team accepted successfully");
    } catch (error) {
      toast.error("Failed to Accept");
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleViewTeam = (recommendationId) => {
    navigate(`/teams/${recommendationId}`);
  };

  if (loading) {
    return <LoadingState message="Loading recommendations..." />;
  }
  
  if (error) {
    return <EmptyState message="No Teams found" />;
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

        <div className="d-flex gap-3 my-5 flex-wrap">
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
            const isOwner = team.ownerId === user?.id;

            // ==========================================
            // LOGIC FOR "MY TEAMS" TAB
            // ==========================================
            if (activeTab === "owned") {
              const recs = team.recommendations || [];

              // If the team has NO recommendations yet, just show the standard card
              if (recs.length === 0) {
                return (
                  <TeamCard
                    key={team.teamId}
                    teamName={team.teamName}
                    hackathonName={team.hackathonName}
                    description={team.description}
                    members={team.currentMembers} 
                    maxMembers={team.maxMembers}
                    isLoading={false}
                    onView={() => handleViewTeam(team.teamId)}
                  />
                );
              }

              // Grouped view for teams WITH recommendations
              return (
                <div key={team.teamId} className="mb-5 p-4 border rounded bg-white shadow-sm">
                  {/* MAIN TEAM DATA HEADER */}
                  <div className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
                    <div>
                      <h4 className="m-0 fw-bold mb-2" style={{ color: "var(--color-very-dark-purple)" }}>
                        {team.teamName}
                      </h4>
                      <p className="text-primary m-0 d-flex align-items-center gap-2 mb-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        {team.hackathonName}
                      </p>
                      {team.description && (
                        <p className="text-secondary m-0 mt-2" style={{ maxWidth: "800px" }}>
                          {team.description}
                        </p>
                      )}
                    </div>
                    <button 
                      className="btn btn-primary px-4 py-2 rounded-pill whitespace-nowrap"
                      onClick={() => handleViewTeam(team.teamId)}
                    >
                      View Team
                    </button>
                  </div>
                  
                  <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3 mt-4">
                    <h5 className="m-0 fw-bold" style={{ color: "var(--color-dark-gray)" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      Recommended Members
                    </h5>
                    <span className="badge bg-light text-primary border border-primary rounded-pill px-3 py-2">
                      {recs.length} Option{recs.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  {/* RECOMMENDATION OPTIONS */}
                  <div className="d-flex flex-column gap-4">
                    {recs.map((rec, index) => (
                      <div key={rec.id} className="p-4 rounded border" style={{ backgroundColor: "#fcfcfc" }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="m-0 fw-bold d-flex align-items-center gap-3">
                            <span className="bg-white text-dark px-3 py-1 rounded-pill shadow-sm border" style={{ fontSize: "0.9rem" }}>
                              Option {index + 1}
                            </span>
                            {rec.matchLevel && (
                              <span className={`badge ${rec.matchLevel === 'High' ? 'bg-success' : rec.matchLevel === 'Medium' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                                {rec.matchLevel} Match
                              </span>
                            )}
                          </h6>
                        </div>
                        
                        {/* MEMBER CARDS GRID */}
                        <div className="row g-3">
                          {rec.members.map(member => (
                            <div key={member.userId} className="col-12 col-md-6 col-lg-4">
                              <div className="bg-white p-3 rounded border shadow-sm h-100 d-flex flex-column">
                                <div className="d-flex align-items-center gap-3 mb-2">
                                  {/* Avatar Fallback */}
                                  {member.profilePicture ? (
                                    <img 
                                      src={member.profilePicture} 
                                      alt={member.name} 
                                      className="rounded-circle" 
                                      style={{ width: "45px", height: "45px", objectFit: "cover" }} 
                                    />
                                  ) : (
                                    <div 
                                      className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold" 
                                      style={{ width: "45px", height: "45px", backgroundColor: "var(--color-very-dark-purple, #6f42c1)" }}
                                    >
                                      {member.name.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                  
                                  {/* Info */}
                                  <div style={{ minWidth: 0 }}>
                                    <h6 className="m-0 fw-bold text-truncate" title={member.name}>
                                      {member.name}
                                    </h6>
                                    <small className="text-muted text-truncate d-block" title={Array.isArray(member.role) ? member.role.join(', ') : member.role}>
                                      {Array.isArray(member.role) ? member.role.join(', ') : member.role || "Member"}
                                    </small>
                                  </div>
                                </div>
                                
                                {/* Skill Tags */}
                                {member.tags && member.tags.length > 0 && (
                                  <div className="d-flex flex-wrap gap-1 mt-auto pt-2">
                                    {member.tags.slice(0, 3).map(tag => (
                                      <span key={tag} className="badge bg-light text-secondary border fw-normal" style={{ fontSize: "0.75rem" }}>
                                        {tag}
                                      </span>
                                    ))}
                                    {member.tags.length > 3 && (
                                      <span className="badge bg-light text-secondary border fw-normal" style={{ fontSize: "0.75rem" }}>
                                        +{member.tags.length - 3}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            // ==========================================
            // LOGIC FOR "INVITATIONS" TAB
            // ==========================================
            return (
              <TeamCard
                key={team.teamId}
                teamName={team.teamName}
                hackathonName={team.hackathonName}
                description={team.description}
                members={team.currentMembers} 
                maxMembers={team.maxMembers}
                isLoading={false}
                onView={() => handleViewTeam(team.teamId)}
              />
            );
          })
        ) : (
          <div className="text-center py-5 text-muted fs-2">
            No teams found.
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendedTeams;