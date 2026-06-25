import styles from "./CTA.module.css";
import { useNavigate } from "react-router-dom"; // 1. Import the routing hook
import CustomButton from "../../../../shared/CustomButton/CustomButton";
function CTA() {
  return (
    <section className="container py-5">
      <div className={`${styles.ctaBox} shadow text-center px-4 py-5 mx-auto`}>
        <h2
          className="fw-bold mb-3"
          style={{
            fontSize: "var(--fs-h2)",
          }}
        >
          Ready to build your dream team?
        </h2>
        <p
          className="text-white mb-4 mx-auto"
          style={{
            fontSize: "var(--fs-regular)",
            maxWidth: "750px",
            opacity: 0.9,
          }}
        >
          Join thousands of developers already using TeamCatalyst to find their
          perfect team and win hackathons.
        </p>

        <CustomButton variant="secondary" size="md">
          Create a Team
        </CustomButton>
      </div>
    </section>
  );
}

export default CTA;
