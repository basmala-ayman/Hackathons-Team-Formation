import StatusBadge from "./Components/StatusBadge";
import toast from "react-hot-toast";
import CustomButton from "../../shared/CustomButton/CustomButton";
import ConfirmationModal from "./Components/ConfirmationModal";
import MemberProgressCard from "./Components/MemberProgressCard";
import { useState } from "react";
import styles from "./TeamProgressTracker.module.css";
import { RaiseUpIcon, ElectricIcon, TeamMeetIcon } from "../../assets/Icons";
import TeamProgressCard from "./Components/TeamProgressCard";
import { LoadingState , EmptyState } from "../../shared/States";
import { useMyTeams } from "./hooks/useMyTeams";

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
      description: "dek fff fff eww sss sss sss",
      members: [
        {
          id: 1,
          name: "Sarah Chen",
          linkedin: "#",
          github: "#",
          status: "ACCEPTED",
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
          status: "REJECTED",
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
          status: "ACCEPTED",
        },
        {
          id: 5,
          name: "Maria Garcia",
          linkedin: "#",
          github: "#",
          status: "ACCEPTED",
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
    <div className={`py-5 min-vh-100 ${styles.pageBackground}`}>
      <div className="container">
        <div className="mb-5">
          <h3
            className="fw-bolder"
            style={{
              color: "var(--color-very-dark-purple)",
              fontSize: "var(--fs-h3)",
            }}
          >
            Team Progress{" "}
          </h3>
          <p
            style={{
              color: "var(--color-dark-gray)",
              fontSize: "var(--fs-regular)",
            }}
          >
           Track your team members' invitation status and finalize your teams.
          </p>
        </div>

        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamProgressCard
              key={team.id}
              team={team}
              onOpenModal={openModal}
            />
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
