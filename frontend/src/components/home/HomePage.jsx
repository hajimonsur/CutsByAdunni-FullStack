import React, { useState, useEffect } from "react";
import HeroSection from "../hero/Hero";
import { Image, Carousel, Button, Form, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScissors,
  faDollarSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./home.css";
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
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio items");
        }
        const data = await response.json();
        setPortfolioItems(data);
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
        setPortfolioItems([]); // Fallback to an empty array
      }
    };

    fetchPortfolio();
  }, []);

  useEffect(() => {
    const fetchTestimony = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/testimony`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch testimonies");
        }
        const data = await response.json();
        setTestimony(data);
      } catch (error) {
        console.error("Error fetching testimony:", error);
        setTestimony([]); // Fallback to an empty array
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

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Why Choose Us Section */}
      <section className="py-5 bg-light text-dark">
        <h2 className="text-center">Why Choose Us?</h2>
        <div className="container">
          <div className="row justify-content-center mt-4">
            <div className="col-md-4 text-center mb-4">
              <FontAwesomeIcon
                icon={faScissors}
                size="3x"
                className="text-warning"
              />
              <h4 className="mt-3">Custom Tailoring</h4>
              <p>Made-to-measure outfits for every occasion.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <FontAwesomeIcon
                icon={faDollarSign}
                size="3x"
                className="text-success"
              />
              <h4 className="mt-3">Affordable Pricing</h4>
              <p>Style that fits your budget.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <FontAwesomeIcon
                icon={faClock}
                size="3x"
                className="text-primary"
              />
              <h4 className="mt-3">Quick Turnaround</h4>
              <p>Get your outfits when you need them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-5 bg-light text-dark">
        <h2 className="text-center">Our Work</h2>
        <motion.div
          className="container d-flex flex-wrap justify-content-center mt-4 portfolio-gallery"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {portfolioItems.length > 0 ? (
            portfolioItems.map((item) => (
              <motion.div
                key={item._id}
                className="portfolio-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={item.images}
                  alt={item.title}
                  className="portfolio-image"
                />
                <div className="portfolio-overlay">
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center">
              No portfolio items available at the moment.
            </p>
          )}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light text-dark">
        <h2 className="text-center mb-4">What Our Clients Say</h2>
        <div className="container">
          <div className="row justify-content-center">
            {testimony.length > 0 ? (
              testimony.map((item) => (
                <div key={item._id} className="col-12 col-md-6 col-lg-4 mb-4">
                  <div className="card shadow-sm border-0 rounded">
                    <div className="card-body">
                      <p className="card-text mb-4 text-muted">
                        {item.testimony}
                      </p>
                      <h5 className="card-title text-dark font-weight-bold">
                        {item.name}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">
                No testimonials available at the moment.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="py-5 text-dark">
        <h2 className="text-center mb-4">Get in Touch</h2>
        <div className="container">
          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Thank you for reaching out! We'll get back to you soon.
            </Alert>
          )}
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Form onSubmit={handleContactSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={contactDetails.name}
                    onChange={(e) =>
                      setContactDetails({
                        ...contactDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
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
                    placeholder="Your message"
                    value={contactDetails.message}
                    onChange={(e) =>
                      setContactDetails({
                        ...contactDetails,
                        message: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Button variant="warning" type="submit" className="mt-3 w-100">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section> */}
      <UploadTestimony />
    </div>
  );
};

export default HomePage;
