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
        "Join candidate pools for hackathons you’re interested in and get matched with teams that fit you.",
      bgClass: styles.yellowBg,
      icon: PrizeIcon,
    },
    {
      id: 3,
      title: "Idea-Based Team Building",
      description:
        "Share your Project idea, attract interested participants, and let AI help build the strongest team around it.",
      bgClass: styles.yellowBg,
      icon: PrizeIcon,
    },
    {
      id: 4,
      title: "Fast AI Recommendations",
      description:
        "Receive team recommendations in minutes, spend less time searching and more time building.",
      bgClass: styles.purbleBg,
      icon: BrainIcon,
    },
  ];
  return (
    <Container >
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
