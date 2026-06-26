
function ConfirmationModal({ isOpen, actionType, onClose, onConfirm }) {
  if (!isOpen) return null;

  const isSatisfied = actionType === 'satisfied';
  const title = isSatisfied ? "Finalize Team?" : "Remake Recommendations?";
  const description = isSatisfied 
    ? "Are you sure you are satisfied with this team? Once confirmed, all pending team requests will be cancelled, and this will become your final team."
    : "Are you sure you want to find new members? This might discard your current pending recommendations and generate new matches.";
  const confirmText = isSatisfied ? "Yes, Finalize Team" : "Yes, Find New Members";
  const confirmColor = isSatisfied ? "var(--color-success-green)" : "var(--color-primary-dark)";

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 9999, fontFamily: 'var(--font-family-inter)' }}
    >
      <div 
        className="card shadow-lg p-4 text-center" 
        style={{ maxWidth: '400px', width: '90%', borderRadius: '1rem', border: 'none' }}
      >
        <h3 className="fw-bold mb-3" style={{ color: 'var(--color-very-dark-purple)', fontSize: 'var(--fs-h3)' }}>
          {title}
        </h3>
        <p className="mb-4" style={{ color: 'var(--color-dark-gray)', fontSize: 'var(--fs-small)' }}>
          {description}
        </p>
        
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <button 
            className="btn px-4 py-2 fw-bold"
            style={{ 
              backgroundColor: 'var(--color-register-bg)', 
              color: 'var(--color-dark-gray)',
              borderRadius: '0.8rem',
              fontSize: 'var(--fs-small)'
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="btn px-4 py-2 fw-bold text-white"
            style={{ 
              backgroundColor: confirmColor,
              borderRadius: '0.8rem',
              fontSize: 'var(--fs-small)'
            }}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
