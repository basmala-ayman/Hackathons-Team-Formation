import StatusBadge from "./Components/StatusBadge";
import toast from "react-hot-toast";
import CustomButton from "../../shared/CustomButton/CustomButton";
import ConfirmationModal from "./Components/ConfirmationModal";
import MemberProgressCard from "./Components/MemberProgressCard";
import { useState } from "react";
import styles from "./TeamProgressTracker.module.css";

function TeamProgressTracker() {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    actionType: null,
    teamId: null,
    teamName: "",
  });

  const [teams, setTeams] = useState([
    {
      id: 101, 
      teamName: "EcoVision Team",
      hackathonName: "Green Tech Hackathon 2028",
      members: [
        {
          id: 1,
          name: "Sarah Chen",
          linkedin: "#",
          github: "#",
          status: "ACCEPT",
        },
        {
          id: 2,
          name: "Mike Johnson",
          linkedin: "#",
          github: "#",
          status: "PENDING",
        },
        {
          id: 3,
          name: "Lisa Park",
          linkedin: "#",
          github: "#",
          status: "REJECT",
        },
      ],
    },
    {
      id: 102,
      teamName: "Quantum Coders",
      hackathonName: "AI Innovation Challenge",
      members: [
        {
          id: 4,
          name: "Alex Turner",
          linkedin: "#",
          github: "#",
          status: "ACCEPT",
        },
        {
          id: 5,
          name: "Maria Garcia",
          linkedin: "#",
          github: "#",
          status: "ACCEPT",
        },
      ],
    },
  ]);

  const openModal = (type, team) => {
    setModalConfig({
      isOpen: true,
      actionType: type,
      teamId: team.id,
      teamName: team.teamName,
    });
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      actionType: null,
      teamId: null,
      teamName: "",
    });
  };

  const handleConfirmAction = async () => {
    try {
      if (modalConfig.actionType === "satisfied") {
        // e.g., await finalizeTeam(modalConfig.teamId);
        toast.success(`${modalConfig.teamName} finalized successfully!`);
      } else if (modalConfig.actionType === "remake") {
        // e.g., await requestNewMatches(modalConfig.teamId);
        toast.success(`Looking for new members for ${modalConfig.teamName}...`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      closeModal();
    }
  };

  return (
    <div
      className={`py-5 position-relative min-vh-100 ${styles.pageBackground}`}
    >
      <div className="container">
        <div className="mb-5">
          <h3
            className="fw-bolder"
            style={{
              color: "var(--color-very-dark-purple)",
              fontSize: "var(--fs-h3)",
            }}
          >
            My Teams Progress
          </h3>
          <p
            style={{
              color: "var(--color-dark-gray)",
              fontSize: "var(--fs-regular)",
            }}
          >
            Track your team members' invitation statuses and finalize your
            squads.
          </p>
        </div>

        {teams.length > 0 ? (
          teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded p-4 p-md-5 mb-5 shadow-sm"
              style={{ border: "0.1rem solid var(--color-light-gray)" }}
            >
              <div
                className="mb-5 border-bottom pb-4"
                style={{ borderColor: "var(--color-light-gray) !important" }}
              >
                <h2
                  className="fw-bolder mb-2"
                  style={{
                    color: "var(--color-very-dark-purple)",
                    fontSize: "var(--fs-h2)",
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
                  <span role="img" aria-label="rocket">
                    🚀
                  </span>
                  {team.hackathonName}
                </p>
              </div>

              {/* Member List Section */}
              <div className="mb-5">
                <h4
                  className="mb-4 fw-bold"
                  style={{
                    color: "var(--color-primary-dark)",
                    fontSize: "var(--fs-h4)",
                  }}
                >
                  Member Progress
                </h4>

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
              <div
                className="d-flex flex-column flex-md-row gap-3 mt-5 pt-4 border-top"
                style={{ borderColor: "var(--color-light-gray) !important" }}
              >
                {/* Pass the 'team' object into the openModal function */}
                <CustomButton
                  variant="secondary"
                  size="md"
                  className="flex-grow-1 shadow-sm py-3"
                  onClick={() => openModal("remake", team)}
                >
                  Not Enough? Get New Matches
                </CustomButton>

                <CustomButton
                  variant="primary"
                  size="md"
                  className="flex-grow-1 shadow-sm py-3"
                  onClick={() => openModal("satisfied", team)}
                >
                  Satisfied? Finalize Team
                </CustomButton>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <p
              style={{
                color: "var(--color-gray)",
                fontSize: "var(--fs-regular)",
              }}
            >
              You don't have any teams in progress right now.
            </p>
          </div>
        )}
      </div>

      {/* The single modal handles all teams dynamically */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        actionType={modalConfig.actionType}
        onClose={closeModal}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}

export default TeamProgressTracker;
