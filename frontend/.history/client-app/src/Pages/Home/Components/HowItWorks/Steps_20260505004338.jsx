import styles from './HowItWorks.module.css'
import { ProfileIcon , TeamIcon , SparkleIcon } from '../../../../assets/Icons';
function Steps({stepItem}) {
    const STEPS = [
  { id: 1, title: "Create your profile", icon: "👤" },
  { id: 2, title: "Create a team", icon: "👥" },
  { id: 3, title: "AI Recommends Teams", icon: "✨" },
];
  return (
    <div>
    <div className="step-wrapper">
    <div className="text-center position-relative" style={{ width: "180px" }}>
      {/* Step Number Badge */}
      <span 
        className="position-absolute top-0 start-100 translate-middle badge rounded-circle d-flex align-items-center justify-content-center shadow-sm"
        style={{ width: "32px", height: "32px", backgroundColor: "#5a32a3", z-index: 2 }}
      >
        {step.id}
      </span>
      
      {/* Purple Circle */}
      <div 
        className="rounded-circle d-flex flex-column align-items-center justify-content-center p-4 mx-auto border-0"
        style={{ backgroundColor: "#f0e6ff", width: "160px", height: "160px" }}
      >
        <div style={{ fontSize: "2.8rem" }} className="mb-1">{step.icon}</div>
        <p className="fw-bold mb-0 lh-sm" style={{ fontSize: "0.85rem", color: "#4a5568" }}>
          {step.title}
        </p>
      </div>
    </div>
  </div>
  )


export default Steps
