import React from "react";
import { Form, Button, Image, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";

const OrderPage = () => {
  const styles = {
    hero: {
      padding: "50px 20px",
      textAlign: "center",
    },
    section: {
      padding: "40px 20px",
    },
    formContainer: {
      maxWidth: "600px",
      margin: "0 auto",
    },
    galleryImage: {
      width: "30%",
      margin: "10px",
      borderRadius: "10px",
    },
    faqCard: {
      marginBottom: "10px",
      border: "none",
      backgroundColor: "#f8f9fa",
    },
    faqHeading: {
      fontWeight: "bold",
    },
  };

  const scrollToCustomizeOrder = () => {
    const element = document.getElementById("customize-order-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fabricDetails, setFabricDetails] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleClear = () => {
    setName("");
    setEmail("");
    setFabricDetails("");
    setMeasurements("");
    setAdditionalNotes("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          customerName: name,
          email,
          fabricDetails,
          measurements,
          additionalNotes,
        }),
      });

      if (response.ok) {
        alert("Order submitted successfully!");
        handleClear();
        window.location.reload();
      } else {
        alert("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Please try again.");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1>Place Your Custom Order</h1>
        <p>
          Experience the finest tailoring with CutByAdunni. Your perfect fit,
          designed just for you.
        </p>
        <Button variant="warning" size="lg" onClick={scrollToCustomizeOrder}>
          Start Your Order
        </Button>
      </section>

      {/* Order Steps */}
      <section style={styles.section}>
        <h2 className="text-center">How It Works</h2>
        <div className="d-flex justify-content-around flex-wrap mt-4">
          <div className="text-center">
            <Image
              src="./images/measurements.png"
              alt="Measurements"
              width={100}
              height={100}
            />
            <h4>Step 1: Provide Measurements</h4>
            <p>Share your exact body measurements for a perfect fit.</p>
          </div>
          <div className="text-center">
            <Image
              src="./images/style.png"
              alt="Choose Style"
              width={100}
              height={100}
            />
            <h4>Step 2: Choose Your Style</h4>
            <p>
              Select your preferred design from our catalog or share your own.
            </p>
          </div>
          <div className="text-center">
            <Image
              src="./images/delivery.png"
              alt="Delivery"
              width={100}
              height={100}
            />
            <h4>Step 3: Receive Your Outfit</h4>
            <p>We’ll deliver your custom-made outfit to your doorstep.</p>
          </div>
        </div>
      </section>

      {/* Customization Form */}
      <section id="customize-order-section" style={styles.section}>
        <h2 className="text-center">Customize Your Order</h2>
        <div style={styles.formContainer}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="fabricDetail">
              <Form.Label>Fabric Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Describe your preferred fabric"
                value={fabricDetails}
                onChange={(e) => setFabricDetails(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="measurements">
              <Form.Label>Measurements</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input your measurements"
                value={measurements}
                onChange={(e) => setMeasurements(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="notes">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add any specific requests or details"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </Form.Group>

            <Button variant="warning" type="submit" className="mt-3 ">
              Submit Order
            </Button>
          </Form>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={styles.section}>
        <h2 className="text-center">Get Inspired</h2>
        <div className="d-flex justify-content-center flex-wrap">
          <Image
            src="./images/gallery1.jpg"
            alt="Gallery 1"
            style={styles.galleryImage}
          />
          <Image
            src="./images/gallery2.jpg"
            alt="Gallery 2"
            style={styles.galleryImage}
          />
          <Image
            src="./images/gallery3.jpg"
            alt="Gallery 3"
            style={styles.galleryImage}
          />
        </div>
      </section>

      {/* FAQ Section */}

      <Accordion className="mt-4 container mx-auto">
        <h2 className="text-center">Frequently Asked Questions</h2>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            How long does it take to receive my order?
          </Accordion.Header>
          <Accordion.Body>
            Our typical turnaround time is 7-14 business days.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Can I provide my own design?</Accordion.Header>
          <Accordion.Body>
            Yes, absolutely! You can upload your design during the order
            process.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            What if the outfit doesn’t fit perfectly?
          </Accordion.Header>
          <Accordion.Body>
            We offer free alterations to ensure your complete satisfaction.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default OrderPage;
