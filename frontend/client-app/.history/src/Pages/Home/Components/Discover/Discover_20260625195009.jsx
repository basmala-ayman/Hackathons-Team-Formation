import { Container, Row, Col } from "react-bootstrap";
import styles from "./Discover.module.css";
import TiltCard from "../../../../shared/TiltCard/TiltCard";
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
      title: "Choose Your Best Team",
      description:
        "Browse AI-matched team options and select your best match.",
      bgClass: styles.purbleBg,
      icon: BrainIcon,
    },
  ];
  return (
    <Container style={{padding:"6rem" }}>
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
              <TiltCard className="h-100">
              <div className={`d-flex gap-5 p-5 rounded-4  ${feature.bgClass}`}>
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
              </TiltCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Discover;
