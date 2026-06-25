import { Container, Row, Col } from "react-bootstrap";
import styles from "./Discover.module.css";
import {BrainIcon, PrizeIcon} from '../../../../assets/Icons'
function Discover() {
   
  const featuresData = [
    {
      id: 1,
      title: "Smart Team Matching",
      description:
        "Join hackathons and get matched with teams that fit your skills and interests.",
      bgClass: styles.purbleBg,
      icon: BrainIcon,
    },
    {
      id: 2,
      title: "Personalized Team Requests",
      description:
        "Create a team request for a specific hackathon by defining the team size, required roles, and key skills you’re looking for.",
      bgClass: styles.yellowBg,
      icon: PrizeIcon,
    },
    {
      id: 3,
      title: "Adaptive Team Completion",
      description:
        "Smartly rebuilds your team in seconds—filling gaps with the perfect match.",
      bgClass: styles.yellowBg,
      icon: PrizeIcon,
    },
    {
      id: 4,
      title: "Project-Based Team Search",
      description:
        "Bring your idea to life with a team crafted exactly for your project.",
      bgClass: styles.purbleBg,
      icon: BrainIcon,
    },
  ];
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="mb-2 fw-bolder" style={{ fontSize: "var(--fs-h2)" }}>
          Discover Powerful Features
        </h2>
        <p className="text-muted" style={{ fontSize: "var(--fs-regular)" }}>
          Intelligent tools to build and grow your hackathon team
        </p>
      </div>
      <Row className="g-4">
        {featuresData.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <Col xs={12} md={6} key={feature.id}>
              <div className={`d-flex gap-3 p-5 rounded-4  ${feature.bgClass}`}>
                <div className={styles.iconBox}>
                  <FeatureIcon></FeatureIcon>
                </div>
                <div>
                  <h5
                    className="fw-bold mb-1"
                    style={{ fontSize: "var(--fs-regular)" }}
                  >
                    {feature.title}
                  </h5>
                  <p
                    className="text-muted"
                    style={{ fontSize: "var(--fs-small)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Discover;
