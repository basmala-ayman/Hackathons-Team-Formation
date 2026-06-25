import React from 'react'
import StatusBadge from './Components/StatusBadge'
import toast from 'react-hot-toast';
import CustomButton from '../../shared/CustomButton/CustomButton';
import ConfirmationModal from './Components/ConfirmationModal';
import MemberProgressCard from './Components/MemberProgressCard';

function TeamProgressTracker() {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, actionType: null });
  const [teamData, setTeamData] = useState({
    teamName: "EcoVision Team",
    hackathonName: "Green Tech Hackathon 2028",
    members: [
      { id: 1, name: "Sarah Chen", linkedin: "#", github: "#", status: "ACCEPT" },
      { id: 2, name: "Mike Johnson", linkedin: "#", github: "#", status: "PENDING" },
      { id: 3, name: "Lisa Park", linkedin: "#", github: "#", status: "REJECT" }
    ]
  });

  const openModal = (type) => setModalConfig({ isOpen: true, actionType: type });
  const closeModal = () => setModalConfig({ isOpen: false, actionType: null });

  const handleConfirmAction = async () => {
    try {
      if (modalConfig.actionType === 'satisfied') {
        toast.success("Team finalized successfully!");
      } else if (modalConfig.actionType === 'remake') {
        toast.success("Looking for new team members...");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      closeModal();
    }
  };
  return (
    <div>
      
    </div>
  )
}

export default TeamProgressTracker
