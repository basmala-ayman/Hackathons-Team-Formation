import { Container, Row, Col } from "react-bootstrap";
import HackathonCard from "../HackathonCard/HackathonCard";
function HackathonGrid({hackathons}) {
  return (
    <Container>
        <Row className="g-4">
            {hackathons.map(hac)}
        </Row>
      
    </Container>
  )
}

export default HackathonGrid
