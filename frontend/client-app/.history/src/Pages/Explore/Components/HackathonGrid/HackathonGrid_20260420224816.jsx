import { Container, Row, Col } from "react-bootstrap";
import HackathonCard from "../HackathonCard/HackathonCard";
function HackathonGrid({hackathons}) {
  return (
    <Container>
        <Row className="g-4">
            {hackathons.map((hackathon)=>(
                <Col xs={12} md={6} lg={3} key={hackathon.id}>
                <HackathonCard hackathon={hackathon}/>
                </Col>
            ))}
        </Row>
      
    </Container>
  )
}

export default HackathonGrid
