import StatusBadge from './Components/StatusBadge'
import toast from 'react-hot-toast';
import CustomButton from '../../shared/CustomButton/CustomButton';
import ConfirmationModal from './Components/ConfirmationModal';
import MemberProgressCard from './Components/MemberProgressCard';
import { useState } from 'react';
import styles from './TeamProgressTracker.module.css'

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
   <div 
      className={`min-vh-100 py-5 position-relative`}
      style={{ background: 'var(--gradient-website-bg)', fontFamily: 'var(--font-family-inter)' }}
    >
      <div  style={{ maxWidth: '800px' }}>
        
        {/* Header Section */}
        <div className="mb-5 border-bottom pb-4" style={{ borderColor: 'var(--color-light-gray) !important' }}>
          <h2 className="fw-bolder mb-2" style={{ color: 'var(--color-very-dark-purple)', fontSize: 'var(--fs-h2)' }}>
            {teamData.teamName}
          </h2>
          <p className="m-0 d-flex align-items-center gap-2" style={{ color: 'var(--color-dark-gray)', fontSize: 'var(--fs-regular)' }}>
            <span role="img" aria-label="rocket">🚀</span> 
            {teamData.hackathonName}
          </p>
        </div>

        {/* Member List Section */}
        <div className="mb-5">
          <h4 className="mb-4 fw-bold" style={{ color: 'var(--color-primary-dark)', fontSize: 'var(--fs-h4)' }}>
            Member Progress
          </h4>
          
          <div className="d-flex flex-column">
            {teamData.members.length > 0 ? (
              teamData.members.map((member) => (
                <MemberProgressCard key={member.id} member={member} />
              ))
            ) : (
              <p style={{ color: 'var(--color-gray)', fontSize: 'var(--fs-small)' }}>
                No members found for this team.
              </p>
            )}
          </div>
        </div>

        {/* --- Action Buttons Section --- */}
        <div className="d-flex flex-column flex-md-row gap-3 mt-5 pt-4 border-top" style={{ borderColor: 'var(--color-light-gray) !important' }}>
          
          {/* Replaced with CustomButton */}
          <CustomButton 
            variant="secondary" 
            size="md" // or "lg" if you have it defined in your CSS module
            className="flex-grow-1 shadow-sm py-3"
            onClick={() => openModal('remake')}
          >
            Not Enough? Get New Matches
          </CustomButton>

          {/* Replaced with CustomButton */}
          <CustomButton 
            variant="primary" 
            size="md" 
            className="flex-grow-1 shadow-sm py-3"
            onClick={() => openModal('satisfied')}
          >
            Satisfied? Finalize Team
          </CustomButton>

        </div>
      </div>

      <ConfirmationModal 
        isOpen={modalConfig.isOpen} 
        actionType={modalConfig.actionType} 
        onClose={closeModal} 
        onConfirm={handleConfirmAction} 
      />
    </div>
  )
}

export default TeamProgressTracker
