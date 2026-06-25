import {useState} from 'react'

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
  return (
  <div 
      className="bg-white px-4 py-3 mb-4 shadow-sm"
      style={{ 
        borderRadius: "1.5rem", 
        cursor: "pointer",
        border: "1px solid var(--color-primary-light-3)" 
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h3 
          className="mb-0 fw-semibold" 
          style={{ 
            fontSize: "var(--fs-small)", 
            color: "var(--color-text)" 
          }}
        >
          {question}
        </h3>
        
        <div 
          className="d-flex justify-content-center align-items-center rounded-circle flex-shrink-0"
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "var(--color-primary-light-2)",
            color: "var(--color-primary-dark)",
            transition: "transform 0.3s ease"
          }}
        >
          <span 
            className="fw-bold" 
            style={{ 
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease-in-out",
              fontSize: "1.2rem",
              lineHeight: "1"
            }}
          >
            +
          </span>
        </div>
      </div>
      
      <div 
        className={`overflow-hidden transition-all ${isOpen ? "mt-3" : ""}`}
        style={{ 
          maxHeight: isOpen ? "200px" : "0", 
          transition: "max-height 0.3s ease-in-out, margin 0.3s ease-in-out" 
        }}
      >
        <p 
          className="mb-0 text-muted" 
          style={{ fontSize: "var(--fs-v-small)" }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default FAQItem
