import React from "react";
import styles from "./Footer.module.css";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";function Footer() {
  return (
    <footer className="py-5">
      <Container>
        {/* 1st row */}
        <Row className="gy-4 mb-5 mt-2">
          <Col xs={12} md={12} lg={3} className="d-flex flex-column align-items-center ">
          <img src={logo} height={60} className="mb-4" />
          <p className={`text-dark ${styles.footerSlogan}`}>Build better teams. Hack smarter.</p>
          </Col>
          <Col xs={12} md={6} lg={3} className="d-flex flex-column gap-3 align-items-center">
            <h6 className={`fw-bold text-dark mb-3 ${styles.footerSections} `}>Product</h6>
            <Link to="/" className={styles.footerLink}>Find a Team</Link>
            <Link to="/" className={styles.footerLink}>Form a Team</Link>
            <Link to="/" className={styles.footerLink}>Explore Hackathons</Link>
          </Col>

          <Col xs={12} md={6} lg={3} className="d-flex flex-column gap-3 align-items-center ">
            <h6  className={`fw-bold text-dark mb-3 ${styles.footerSections} `}>Resources</h6>
            <Link to="/" className={styles.footerLink}>How It Works</Link>
            <Link to="/" className={styles.footerLink}>Features</Link>
            <Link to="/" className={styles.footerLink}>Blog</Link>
          </Col>

          <Col xs={12} md={6} lg={3} className="d-flex flex-column gap-3 align-items-center">
            <h6 className={`fw-bold text-dark mb-3 ${styles.footerSections} `}>Social</h6>
            <a href="mailto:team.catalyst26@gmail.com" className={styles.footerLink}>
              team.catalyst26@gmail.com
            </a>
          </Col>
        </Row>

        {/* 2nd row */}
        <Row className={styles.copyrightRow}>
          <Col className="text-center">
            <p>© 2026 TeamCatalyst. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
