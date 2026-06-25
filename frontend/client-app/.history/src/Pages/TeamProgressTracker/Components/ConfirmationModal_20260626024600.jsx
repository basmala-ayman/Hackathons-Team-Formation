import CustomButton from "../../../shared/CustomButton/CustomButton";

function ConfirmationModal({ isOpen, actionType, onClose, onConfirm }) {
  if (!isOpen) return null;

  const isSatisfied = actionType === 'satisfied';
  const title = isSatisfied ? "Confirm Final Team?" : "Remake Recommendations?";
  const description = isSatisfied 
    ? "Are you sure you are satisfied with this team? Once confirmed, all pending requests will be cancelled, and this will become your final team."
    : "AI will keep your accepted members and find additional teammates to complete your team.";
  const confirmText = isSatisfied ? "Yes, Finalize Team" : "Yes, Find New Members";

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 9999, fontFamily: 'var(--font-family-inter)' }}
    >
      <div 
        className="card shadow-lg p-5 text-center" 
        style={{ maxWidth: '550px', width: '90%', borderRadius: '1rem', border: 'none' }}
      >
        <h3 className="fw-bold mb-3" style={{ color: 'var(--color-very-dark-purple)', fontSize: 'var(--fs-regular)' }}>
          {title}
        </h3>
        <p className="mb-4" style={{ color: 'var(--color-dark-gray)', fontSize: 'var(--fs-small)' }}>
          {description}
        </p>
        
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <CustomButton 
            variant="secondary" 
            size="sm"
            onClick={onClose}
           
          >
            Cancel
          </CustomButton>

          <CustomButton 
            variant="primary" 
            size="sm"
            onClick={onConfirm}
           
          >
            {confirmText}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
