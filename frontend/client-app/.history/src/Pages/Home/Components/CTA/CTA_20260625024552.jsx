import styles from "./CTA.module.css";
import { useNavigate } from "react-router-dom"; // 1. Import the routing hook
import CustomButton from "../../../../shared/CustomButton/CustomButton";
function CTA() {
    const navigate=useNavigate();
  return (
    <section className="" style={{ background: "var(--color-primary-light-4)", padding:"6rem" }}>
      <div className="container">
      <div className={`${styles.ctaBox} shadow text-center px-4 py-5 mx-auto`}>
        <h2 className="mb-3 fw-bold" style={{ fontSize: "var(--fs-h2)" }}>
          Ready to build your dream team?
        </h2>
        <p
          className="mb-5 mx-auto"
          style={{
            fontSize: "var(--fs-regular)",
            maxWidth: "750px",
            opacity: 0.9,
          }}
        >
          Join thousands of developers already using TeamCatalyst to find their
          perfect team and win hackathons.
        </p>

        <CustomButton variant="primary" size="md" onClick={() => navigate('/create')}>
          Create a Team
        </CustomButton>
      </div>
      </div>
    </section>
  );
}

export default CTA;
