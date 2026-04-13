import React from "react";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className="">
      <Container>
        {/* 1st row */}
        <Row className="gy-4 mb-4"></Row>

        {/* 2nd row */}
        <Row>
          <Col className="text-center">
          <p>© 2026 TeamCatalyst. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
