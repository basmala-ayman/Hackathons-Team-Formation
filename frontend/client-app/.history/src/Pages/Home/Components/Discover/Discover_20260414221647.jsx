import { Container, Row, Col } from "react-bootstrap";
import styles from "./Discover.module.css";
function Discover() {
  const BrainIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M16 24V6.66663"
        stroke="#6B46C1"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 17.3333C18.8464 16.9961 17.8331 16.2942 17.112 15.3327C16.3909 14.3712 16.0007 13.2019 16 12C15.9993 13.2019 15.6091 14.3712 14.888 15.3327C14.1669 16.2942 13.1536 16.9961 12 17.3333"
        stroke="#6B46C1"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.464 8.66668C23.7708 8.13533 23.9513 7.54052 23.9914 6.92827C24.0316 6.31602 23.9303 5.70274 23.6956 5.13587C23.4608 4.569 23.0987 4.06374 22.6374 3.65919C22.1761 3.25463 21.6279 2.96161 21.0353 2.8028C20.4426 2.644 19.8214 2.62366 19.2196 2.74337C18.6178 2.86308 18.0517 3.11961 17.5649 3.49314C17.0781 3.86667 16.6838 4.34716 16.4125 4.89746C16.1411 5.44776 16 6.05311 16 6.66668C16 6.05311 15.8589 5.44776 15.5875 4.89746C15.3162 4.34716 14.9219 3.86667 14.4351 3.49314C13.9483 3.11961 13.3822 2.86308 12.7804 2.74337C12.1786 2.62366 11.5574 2.644 10.9647 2.8028C10.3721 2.96161 9.82387 3.25463 9.36257 3.65919C8.90127 4.06374 8.53923 4.569 8.30444 5.13587C8.06965 5.70274 7.96842 6.31602 8.00858 6.92827C8.04873 7.54052 8.22919 8.13533 8.536 8.66668"
        stroke="#6B46C1"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.9961 6.83337C24.7798 7.03489 25.5074 7.41211 26.1238 7.93646C26.7401 8.46081 27.2291 9.11854 27.5536 9.85984C27.8782 10.6011 28.0297 11.4066 27.9969 12.2151C27.9641 13.0237 27.7477 13.8142 27.3641 14.5267"
        stroke="#6B46C1"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24 24C25.174 23.9999 26.3152 23.6125 27.2466 22.8978C28.178 22.1831 28.8475 21.181 29.1514 20.047C29.4552 18.913 29.3764 17.7104 28.9272 16.6258C28.4779 15.5411 27.6834 14.635 26.6667 14.048"
        stroke="#6B46C1"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.6223 23.3107C26.7158 24.0337 26.66 24.7681 26.4585 25.4687C26.257 26.1693 25.9139 26.8211 25.4506 27.3839C24.9873 27.9468 24.4135 28.4086 23.7647 28.741C23.1159 29.0734 22.4058 29.2692 21.6784 29.3164C20.9509 29.3637 20.2215 29.2612 19.5352 29.0155C18.8488 28.7697 18.2202 28.3859 17.688 27.8877C17.1558 27.3895 16.7314 26.7874 16.4411 26.1188C16.1507 25.4501 16.0004 24.729 15.9997 24C15.9989 24.729 15.8487 25.4501 15.5583 26.1188C15.2679 26.7874 14.8435 27.3895 14.3114 27.8877C13.7792 28.3859 13.1505 28.7697 12.4642 29.0155C11.7779 29.2612 11.0484 29.3637 10.321 29.3164C9.59351 29.2692 8.88344 29.0734 8.23463 28.741C7.58582 28.4086 7.01204 27.9468 6.54872 27.3839C6.0854 26.8211 5.74238 26.1693 5.54085 25.4687C5.33932 24.7681 5.28356 24.0337 5.37701 23.3107"
        stroke="#6B46C1"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.00009 24C6.82609 23.9999 5.6849 23.6125 4.75351 22.8978C3.82213 22.1831 3.15259 21.181 2.84873 20.047C2.54487 18.913 2.62367 17.7104 3.07291 16.6258C3.52216 15.5411 4.31674 14.635 5.33343 14.048"
        stroke="#6B46C1"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.00423 6.83337C7.2205 7.03489 6.4929 7.41211 5.87654 7.93646C5.26018 8.46081 4.77122 9.11854 4.44669 9.85984C4.12216 10.6011 3.97058 11.4066 4.00342 12.2151C4.03626 13.0237 4.25266 13.8142 4.63623 14.5267"
        stroke="#6B46C1"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
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
      icon: BrainIcon,
    },
    {
      id: 2,
      title: "Hackathon Recommendation",
      description:
        "Get personalized event suggestions tailored to your profile.",
      bgClass: styles.yellowBg,
      icon: BrainIcon,
    },
    {
      id: 3,
      title: "Adaptive Team Completion",
      description:
        "Smartly rebuilds your team in seconds—filling gaps with the perfect match.",
      bgClass: styles.yellowBg,
      icon: BrainIcon,
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
          const featureIcon = featuresData.icon;
          return (
            <Col xs={12} md={6} key={feature.id}>
              <div className={`d-flex gap-3 p-4 rounded-4 ${feature.bgClass}`}>
                <div className={styles.iconBox}>{featureIcon}</div>
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
