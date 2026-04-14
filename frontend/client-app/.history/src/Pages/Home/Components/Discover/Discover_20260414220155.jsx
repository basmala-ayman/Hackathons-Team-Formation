import { Container, Row, Col } from "react-bootstrap";
import styles from './Discover.module.css';
function Discover() {
  const brainIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.496 1.509 1.333 1.509 2.316V18"
      />
    </svg>
  );

  const featuresData = [
    {
      id: 1,
      title: "Skill and Personality Matching",
      description:
        "Connect with team members based on skills & skill-set compatibility.",
      bgClass: styles.purbleBg,
      icon: {brainIcon},
    },
    {
      id: 2,
      title: "Hackathon Recommendation",
      description:
        "Get personalized event suggestions tailored to your profile.",
      bgClass: styles.yellowBg,
      icon: {brainIcon},
    },
     {
      id: 3,
      title: "Adaptive Team Completion",
      description:
        "Smartly rebuilds your team in seconds—filling gaps with the perfect match.",
      bgClass: styles.yellowBg,
      icon: {brainIcon},
    },
     {
      id: 4,
      title: "Project-Based Team Search",
      description:
        "Bring your idea to life with a team crafted exactly for your project.",
      bgClass: styles.purbleBg,
      icon: {brainIcon},
    },
  ];
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="mb-2 fw-bolder">Discover Powerful Features</h2>
        <p className="text-muted">Intelligent tools to build and grow your hackathon team</p>
      </div>
      <Row>
       {featuresData.map((feature=>{
        const featureIcon=featuresData.icon;
        return(
        <Col xs={12} md={6} key={feature.id}> 
          <div className={`d-flex gap-3 p-4 ${feature.bgClass}`}>
            <div className={styles.iconBox}>
                {featureIcon}
            </div>
             <div>
                <h5 fw->{feature.title}</h5>
                <p>{feature.description}</p>
             </div>
          </div>
        </Col>
        )
       }))}
      </Row>
    </Container>
  );
}

export default Discover;
