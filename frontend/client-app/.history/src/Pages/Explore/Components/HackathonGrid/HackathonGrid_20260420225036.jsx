import { Container, Row, Col } from "react-bootstrap";
import HackathonCard from "../HackathonCard/HackathonCard";
function HackathonGrid({hackathons}) {
    if (!hackathons || hackathons.length === 0) {
    return <p className="text-center mt-5">No hackathons available at the moment.</p>;
  }
  return (
    <Container>
        <Row className="g-4">
            {hackathons.map((hackathon)=>(
                <Col xs={12} md={6} lg={4} key={hackathon.id}>
                <HackathonCard hackathon={hackathon}/>
                </Col>
            ))}
        </Row>
      
    </Container>
  )
}

export default HackathonGrid
