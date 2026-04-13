import styles from './HeroSection.module.css'
import { Container, Row, Col } from "react-bootstrap";
import HeroImg from '../../../../assets/landing1.png'

function HeroSection() {
  return (
    <section className="mt-5 bg-white">
      <Container>
        <Row className="gy-5">
          
          <Col xs={12} lg={6} className="d-flex flex-column align-items-start">
            <h1>Text goes here</h1>
          </Col>

          <Col xs={12} lg={6} className="d-none d-lg-block">
             <img src={HeroImg} alt="Hero Image" />
          </Col>

        </Row>

      </Container>
    </section>
  );
}

export default HeroSection;