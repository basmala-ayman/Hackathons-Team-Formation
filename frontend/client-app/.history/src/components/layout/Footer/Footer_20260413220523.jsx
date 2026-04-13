import React from "react";
import styles from "./Footer.module.css";
import logo from "../../../assets/logo.png";
function Footer() {
  return (
    <footer className="">
      <Container>
        {/* 1st row */}
        <Row className="gy-4 mb-4">
          <Col xs={12} md={12} lg={3}>
          <img src={logo} alt="" />
          </Col>
          <Col xs={12} md={4} lg={3}></Col>
          <Col xs={12} md={4} lg={3}></Col>
          <Col xs={12} md={4} lg={3}></Col>
        </Row>

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
