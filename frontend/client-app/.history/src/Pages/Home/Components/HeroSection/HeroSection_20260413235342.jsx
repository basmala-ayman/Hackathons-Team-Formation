import styles from './HeroSection.module.css'
import { Container, Row, Col } from "react-bootstrap";
import HeroImg from '../../../../assets/landing1.png'
import { Sparkles } from "lucide-react";

function HeroSection() {
  return (
    <section className="py-5 bg-white">
      <Container className='py-5'>
        <Row className="gy-5">
          
          <Col xs={12} lg={6} className="d-flex flex-column align-items-start">
           <div className={`d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4 ${styles.badge}`}>
              <Sparkles size={25} />
              <span className="fw-medium">AI-powered Platform</span>
            </div>
            </Col>

          <Col xs={12} lg={6} className="ms-auto d-none d-lg-block ">
             <img src={HeroImg} alt="Hero Image" className={styles.heroImg}/>
          </Col>

        </Row>

      </Container>
    </section>
  );
}

export default HeroSection;