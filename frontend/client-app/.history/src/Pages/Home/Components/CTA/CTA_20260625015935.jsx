import styles from "./CTA.module.css";
function CTA() {
  return (
   <section className="container py-5">
      <div className={`${styles.ctaBox} shadow text-center px-4 py-5 mx-auto`}>
        
        {/* Main Title */}
        <h2 
          className="fw-bold text-white mb-3" 
          style={{ fontSize: "var(--fs-h2)" }}
        >
          Ready to build your dream team?
        </h2>
        
        {/* Subtitle / Description */}
        <p 
          className="text-white mb-4 mx-auto" 
          style={{ 
            fontSize: "var(--fs-regular)", 
            maxWidth: "750px", 
            opacity: 0.9 
          }}
        >
          Join thousands of developers already using TeamCatalyst to find their perfect team and win hackathons.
        </p>
        
        {/* CTA Button */}
        <button className={`btn fw-bold px-5 py-3 ${styles.ctaBtn}`}>
          Create a Team
        </button>
        
      </div>
    </section>

  );
}

export default CTA
