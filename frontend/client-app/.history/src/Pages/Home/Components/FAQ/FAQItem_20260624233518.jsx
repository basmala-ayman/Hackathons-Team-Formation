import {useState} from 'react'
import styles from './FAQItem.module.css'

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className={`bg-white px- py-3 mb-4 shadow-sm ${styles.faqItem}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h3 className={`mb-0 fw-semibold ${styles.faqTitle}`}>
          {question}
        </h3>
        
        <div className={`d-flex justify-content-center align-items-center rounded-circle flex-shrink-0 ${styles.iconContainer}`}>
          <span className={`fw-bold ${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
            +
          </span>
        </div>
      </div>
      
      <div className={`${styles.answerContainer} ${isOpen ? styles.answerContainerOpen : ""}`}>
        <p className={`mb-0 text-muted ${styles.answerText}`}>
          {answer}
        </p>
      </div>
    </div>
  );
}

export default FAQItem
