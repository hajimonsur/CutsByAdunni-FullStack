"use client";

import { Container, Row, Col, Button } from "react-bootstrap";

const HeroSection = () => {
  const styles = {
    hero: {
      position: "relative", // To enable overlay positioning
      height: "100vh", // Full viewport height
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#fff",
      backgroundImage:
        "url('./images/apparel.jpg')",
      backgroundSize: "cover", // Ensures the image covers the entire section
      backgroundPosition: "center", // Centers the image
      backgroundRepeat: "no-repeat", // Prevents tiling
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay for better text contrast
      zIndex: 1, // Places overlay behind the content
    },
    content: {
      position: "relative", // Ensures it appears above the overlay
      zIndex: 2, // Places content above the overlay
    },
  };

  return (
    <section style={styles.hero}>
      <div style={styles.overlay}></div>
      <Container>
        <Row>
          <Col style={styles.content}>
            <h1 className="display-4">Welcome to Cuts By Adunni</h1>
            <p className="lead">
              Your one-stop destination for elegant, tailor-made outfits.
            </p>
            {/* <div className="d-flex justify-content-center gap-3">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
              <Button variant="outline-light" size="lg">
                Learn More
              </Button>
            </div> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
