import { Container , Row , Column } from "react-bootstrap"

function Discover() {
    const featuresData=[
        {id:1,
            title:"Skill and Personality Matching",
            description:""
        }
    ]
  return (

    <Container>
        <div className="discoverText">
            <p>Discover Powerful Features</p>
            <p>Intelligent tools to build and grow your hackathon team</p>
        </div>
      <Row>
         <Column sm={12} md={6}></Column>
         <Column sm={12} md={6}></Column>
      </Row>
    </Container>
  )
}

export default Discover
