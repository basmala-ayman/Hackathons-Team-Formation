import CustomButton from "../../../shared/CustomButton/CustomButton";

function ConfirmationModal({ isOpen, actionType, onClose, onConfirm }) {
  if (!isOpen) return null;

  const isSatisfied = actionType === 'satisfied';
  const title = isSatisfied ? "Finalize Team?" : "Remake Recommendations?";
  const description = isSatisfied 
    ? "Are you sure you are satisfied with this team? Once confirmed, all pending requests will be cancelled, and this will become your final team."
    : "Are you sure you want to find new members? Our AI Model will find suitable members to complete your team while keeping your accepted members.";
  const confirmText = isSatisfied ? "Yes, Finalize Team" : "Yes, Find New Members";

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 9999, fontFamily: 'var(--font-family-inter)' }}
    >
      <div 
        className="card shadow-lg py-4 text-center" 
        style={{ maxWidth: '400px', width: '90%', borderRadius: '1rem', border: 'none' }}
      >
        <h3 className="fw-bold mb-3" style={{ color: 'var(--color-very-dark-purple)', fontSize: 'var(--fs-h3)' }}>
          {title}
        </h3>
        <p className="mb-4" style={{ color: 'var(--color-dark-gray)', fontSize: 'var(--fs-small)' }}>
          {description}
        </p>
        
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <CustomButton 
            variant="secondary" 
            onClick={onClose}
            className="w-100"
          >
            Cancel
          </CustomButton>

          <CustomButton 
            variant="primary" 
            onClick={onConfirm}
            className="w-100"
          >
            {confirmText}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
