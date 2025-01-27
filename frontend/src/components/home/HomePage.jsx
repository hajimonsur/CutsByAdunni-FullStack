import React, { useState, useEffect } from "react";
import HeroSection from "../hero/Hero";
import {
  Image,
  Carousel,
  Button,
  Form,
  Alert,
  Container,
  Card,
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaCut,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";

import "./Home.css";
import UploadTestimony from "../testimony/UploadTestimony";

const HomePage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [portfolioItems, setPortfolioItems] = useState([]);
  const [testimony, setTestimony] = useState([]);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/portfolio`);
        if (!response.ok) throw new Error("Failed to fetch portfolio items");
        const data = await response.json();
        setPortfolioItems(data);
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
      }
    };

    fetchPortfolio();
  }, []);

  useEffect(() => {
    const fetchTestimony = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/testimony`);
        if (!response.ok) throw new Error("Failed to fetch testimonies");
        const data = await response.json();
        setTestimony(data);
      } catch (error) {
        console.error("Error fetching testimony:", error);
      }
    };

    fetchTestimony();
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setContactDetails({ name: "", email: "", message: "" });
    setTimeout(() => setShowAlert(false), 3000);
  };

  const styles = {
    cardImage: {
      maxHeight: "300px",
      objectFit: "cover",
    },
    videoStyle: {
      maxWidth: "100%",
      height: "auto",
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Why Choose Us */}
      <section className="py-5 bg-light">
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <FaCut size={48} className="text-warning" />{" "}
              <h4>Custom Tailoring</h4>
              <p>Made-to-measure outfits for every occasion.</p>
            </div>
            <div className="col-md-4 mb-4">
              <FaDollarSign size={60} className="text-success mb-3" />
              <h4>Affordable Pricing</h4>
              <p>Style that fits your budget.</p>
            </div>
            <div className="col-md-4 mb-4">
              <FaClock size={60} className="text-primary mb-3" />
              <h4>Quick Turnaround</h4>
              <p>Get your outfits when you need them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-5">
        <h2 className="text-center mb-4">Our Portfolio</h2>
        <motion.div
          className="container d-flex flex-wrap justify-content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {portfolioItems.length > 0 ? (
            portfolioItems.slice(0, 6).map((item) => (
              <Card
                key={item._id}
                className="shadow-sm m-3"
                style={{ width: "300px" }}
              >
                {/* Check if images is an array and contains at least one image or video */}
                {Array.isArray(item.images) && item.images.length > 0 ? (
                  item.images[0].endsWith(".mp4") ? (
                    <video
                      controls
                      style={styles.videoStyle}
                      src={item.images[0]}
                      alt={item.title}
                    />
                  ) : (
                    <Card.Img
                      variant="top"
                      src={item.images[0]}
                      alt={item.title}
                      style={styles.cardImage}
                    />
                  )
                ) : item.images && item.images !== "" ? (
                  item.images.endsWith(".mp4") ? (
                    <video
                      controls
                      style={styles.videoStyle}
                      src={item.images}
                      alt={item.title}
                    />
                  ) : (
                    <Card.Img
                      variant="top"
                      src={item.images}
                      alt={item.title}
                      style={styles.cardImage}
                    />
                  )
                ) : (
                  <Card.Text>No media available</Card.Text>
                )}
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No items available.</p>
          )}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <h2 className="text-center mb-4">What Our Clients Say</h2>
        <Carousel>
          {testimony.length > 0 ? (
            testimony.map((item) => (
              <Carousel.Item key={item._id}>
                <div className="d-flex flex-column align-items-center">
                  <p className="text-muted text-center">{item.testimony}</p>
                  <h5>{item.name}</h5>
                </div>
              </Carousel.Item>
            ))
          ) : (
            <p>No testimonials available.</p>
          )}
        </Carousel>
      </section>

      {/* Contact Us Section */}
      <section className="py-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <Container>
          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Thank you for reaching out! We'll get back to you soon.
            </Alert>
          )}
          <Form onSubmit={handleContactSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={contactDetails.name}
                onChange={(e) =>
                  setContactDetails({ ...contactDetails, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={contactDetails.email}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="message" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={contactDetails.message}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    message: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-4 w-100">
              Submit
            </Button>
          </Form>
        </Container>
      </section>

    </div>
  );
};

export default HomePage;
