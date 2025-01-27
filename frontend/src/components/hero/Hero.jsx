"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/order");
    } else {
      navigate("/login");
    }
  };

  const handleLearnMore = () => {
    navigate("/contact");
  };

  const styles = {
    hero: {
      position: "relative",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#fff",
      backgroundImage: "url('./images/apparel.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 2,
    },
    heading: {
      color: "#fff",
    },
    yellowButton: {
      backgroundColor: "#f5c518",
      color: "black",
      border: "none",
      transition: "transform 0.3s, background-color 0.3s", // Smooth transition
      transform: isHovered ? "scale(1.1)" : "scale(1)", // Slight zoom on hover
      backgroundColor: isHovered ? "#ffd700" : "#f5c518", // Brighter yellow on hover
    },
  };

  return (
    <section style={styles.hero}>
      <div style={styles.overlay}></div>
      <Container>
        <Row>
          <Col style={styles.content}>
            <h1 className="display-4" style={styles.heading}>
              Welcome to Cuts By Adunni
            </h1>
            <p className="lead">
              Your one-stop destination for elegant, tailor-made outfits.
            </p>
            {/* Stack buttons on smaller screens */}
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Button
                style={styles.yellowButton}
                size="lg"
                onClick={handleGetStarted}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Get Started
              </Button>
              <Button
                variant="outline-warning"
                size="lg"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
