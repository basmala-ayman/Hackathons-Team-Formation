import React from "react";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className="">
      <Container>
        <Row className="gy-4 mb-4"></Row>
        <Row>
          {" "}
          <Col className="text-center"></Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
