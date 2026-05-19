import styles from './InterestModal.module.css'
import { SparkleIcon } from '../../../assets/Icons'
function InterestModal({ isOpen, onClose, projectTitle }) {
 if (!isOpen) return null;
    return (

    <>
      {/* 1. Modal Overlay Backdrop Container */}
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        role="dialog"
        style={{ 
          backgroundColor: 'rgba(26, 6, 79, 0.4)', 
          backdropFilter: 'blur(4px)',
          zIndex: 1100 
        }} 
        onClick={onClose}
      >
        {/* 2. Vertically Centered Dialog Box */}
        <div 
          className="modal-dialog modal-dialog-centered" 
          style={{ maxWidth: '540px' }}
          onClick={(e) => e.stopPropagation()} // Prevents overlay close trigger when clicking inner elements
        >
          {/* 3. Modal Inner Content Card */}
          <div className="modal-content border-0 p-4 shadow rounded-4 bg-white">
            
            {/* Header Area */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h2 className="fw-bolder m-0" style={{ color: '#1a064f', fontSize: '2.6rem' }}>
                Interest Registered! 🎉
              </h2>
              <button 
                type="button" 
                className="btn-close shadow-none m-0" 
                onClick={onClose} 
                aria-label="Close"
              ></button>
            </div>

            {/* Subtitle Body Content */}
            <div className="modal-body p-0">
              <p className="mb-4" style={{ color: '#5c627a', fontSize: '1.7rem', lineHeight: '1.5' }}>
                You've shown interest in <strong style={{ color: '#1a064f', fontWeight: '700' }}>"{projectTitle}"</strong>
              </p>

              {/* --- 4. BRANDED AI CALLOUT BOX REPLICATED WITH BOOTSTRAP UTILITIES --- */}
              <div 
                className="p-4 rounded-3 text-start" 
                style={{ backgroundColor: '#f4efff' }} // Custom light purple fill
              >
                <div className="d-flex align-items-center gap-2 mb-2" style={{ color: '#7c4dff' }}>
                  <HiSparkles size={22} />
                  <span className="fw-bold" style={{ fontSize: '1.8rem', letterSpacing: '-0.2px' }}>
                    AI Matching in Progress
                  </span>
                </div>
                <p className="mb-0" style={{ color: '#4a4d5a', fontSize: '1.6rem', lineHeight: '1.6' }}>
                  Our AI is analyzing your profile and skills to create the perfect team. 
                  The project creator will receive team recommendations within 30 minutes!
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Optional: Simple inline keyframe styles for smooth modal entrance fade animations */}
      <style>{`
        .modal { animation: fadeIn 0.2s ease-out; }
        .modal-dialog { animation: slideUp 0.25s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </>
  )
}

export default InterestModal
