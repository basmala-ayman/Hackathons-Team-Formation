import styles from './HeroSection.module.css'
import { Container, Row, Col } from "react-bootstrap";

function HeroSection() {
  return (
    <section className="py-5 bg-white">
      <Container>
        <Row className="align-items-center gy-5">
          
          {/* THE LEFT COLUMN (For Text & Buttons) */}
          <Col xs={12} lg={6} className="d-flex flex-column align-items-start">
            <h1>Text goes here</h1>
          </Col>

          {/* THE RIGHT COLUMN (For the Graphic) */}
          {/* FIX: Added d-none d-lg-block right here! */}
          <Col xs={12} lg={6} className="text-center text-lg-end d-none d-lg-block">
             <h1>Image goes here</h1>
          </Col>

        </Row>

      </Container>
    </section>
  );
}

export default HeroSection;