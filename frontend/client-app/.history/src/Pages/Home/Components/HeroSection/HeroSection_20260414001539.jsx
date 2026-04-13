import styles from "./HeroSection.module.css";
import { Container, Row, Col } from "react-bootstrap";
import HeroImg from "../../../../assets/landing1.png";
import { Sparkles } from "lucide-react";
import CustomButton from "../../../../shared/CustomButton/CustomButton";

function HeroSection() {
  return (
    <section className="py-5 bg-white">
      <Container className="py-5">
        <Row className="gy-5">
          <Col xs={12} lg={6} className="d-flex flex-column align-items-start">
            <div
              className={`d-inline-flex align-items-center gap-2 px-5 py-2 rounded-pill mb-4 ${styles.badge}`}
            >
              <Sparkles size={20} />
              <span>AI-powered Platform</span>
            </div>

            <h1 className={`fw-bold mb-4 ${styles.heroTitle}`}>
              Elevate your hackathon game with{" "}
              <span className={styles.textGradient}>TeamCatalyst</span>
            </h1>
            <p className={`${styles.heroSubTitle} fw-medium`}>Build the perfect hackathon team using AI-powered skill and personality matching.</p>
          <div className="buttons">
            <CustomButton variant="primary">
                Create a team
            </CustomButton>
          </div>
          </Col>

          <Col xs={12} lg={6} className="ms-auto d-none d-lg-block ">
            <img src={HeroImg} alt="Hero Image" className={styles.heroImg} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
