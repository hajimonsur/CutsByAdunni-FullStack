import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Accordion,
} from "react-bootstrap";
import { FaRuler, FaPalette, FaUpload, FaSmile } from "react-icons/fa";

const OrderPage = () => {
  const styles = {
    hero: {
      padding: "50px 20px",
      textAlign: "center",
      backgroundColor: "#f1f1f1",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "30px",
    },
    stepContainer: {
      padding: "30px 20px",
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      gap: "20px",
    },
    stepCard: {
      textAlign: "center",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "250px",
    },
    icon: {
      fontSize: "50px",
      color: "#FFC107",
      marginBottom: "15px",
    },
    formContainer: {
      padding: "40px 20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "800px",
      margin: "0 auto",
    },
    accordionSection: {
      padding: "40px 20px",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    filePreview: {
      position: "relative",
      marginRight: "10px",
      marginBottom: "10px",
    },
    removeButton: {
      position: "absolute",
      top: "5px",
      right: "5px",
      background: "rgba(255, 0, 0, 0.7)",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      padding: "5px",
    },
    galleryImage: {
      maxWidth: "120px",
      maxHeight: "120px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    videoPlayer: {
      maxWidth: "120px",
      maxHeight: "120px",
      objectFit: "cover",
      borderRadius: "8px",
    },
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fabricDetails, setFabricDetails] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [styleInspo, setStyleInspo] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME;
  const apiUrl = import.meta.env.VITE_API_URL;
  const uploadPreset = import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleClear = () => {
    setName("");
    setEmail("");
    setFabricDetails("");
    setMeasurements("");
    setAdditionalNotes("");
    setStyleInspo([]);
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
          styleInspo,
        }),
      });

      if (response.ok) {
        setAlertMessage({
          type: "success",
          text: "Order submitted successfully!",
        });
        handleClear();
      } else {
        setAlertMessage({
          type: "danger",
          text: "Failed to submit order. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setAlertMessage({
        type: "danger",
        text: "Failed to submit order. Please try again.",
      });
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const uploadedUrls = [];

    if (files.length > 0) {
      try {
        for (let file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", `${uploadPreset}`);

          const resourceType = file.type.startsWith("video")
            ? "video"
            : "image";

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            uploadedUrls.push(data.secure_url);
          } else {
            console.error("Failed to upload file:", file.name);
          }
        }

        setStyleInspo((prev) => [...prev, ...uploadedUrls]);
      } catch (error) {
        console.error("Error uploading files to Cloudinary:", error);
      }
    }
  };

  const handleRemoveFile = (index) => {
    setStyleInspo((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <section style={styles.hero}>
        <h1>Welcome to CutByAdunni</h1>
        <p>Your personal tailoring experience made easy and stylish.</p>
        <Button variant="warning" size="lg" href="#customize-order-section">
          Start Your Order
        </Button>
      </section>

      <section>
        <h2 className="text-center">How It Works</h2>
        <div style={styles.stepContainer}>
          <div style={styles.stepCard}>
            <FaPalette style={styles.icon} />
            <h5>Choose Your Fabric</h5>
            <p>
              Select from a variety of premium fabrics for your custom look.
            </p>
          </div>
          <div style={styles.stepCard}>
            <FaRuler style={styles.icon} />
            <h5>Provide Measurements</h5>
            <p>Ensure the perfect fit by sharing your exact measurements.</p>
          </div>
          <div style={styles.stepCard}>
            <FaUpload style={styles.icon} />
            <h5>Upload Style Inspiration</h5>
            <p>Share images or videos of your desired style.</p>
          </div>
        </div>
      </section>

      <section id="customize-order-section" style={styles.formContainer}>
        <h3 className="text-center mb-4">Customize Your Order</h3>
        {alertMessage && (
          <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="fabricDetail" className="mb-3">
            <Form.Label>Fabric Details</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe your preferred fabric"
              value={fabricDetails}
              onChange={(e) => setFabricDetails(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="measurements" className="mb-3">
            <Form.Label>Measurements</Form.Label>
            <Form.Control
              type="text"
              placeholder="Provide your measurements"
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3">
            <label htmlFor="upload" className="form-label">
              Upload Style Inspiration
            </label>
            <input
              type="file"
              id="upload"
              multiple
              accept="image/*, video/*"
              onChange={handleFileChange}
            />
            {styleInspo.length > 0 && (
              <div className="mt-2">
                <strong>Uploaded Files:</strong>
                <div className="d-flex flex-wrap">
                  {styleInspo.map((url, index) => (
                    <div key={index} style={styles.filePreview}>
                      {url.includes("video") ? (
                        <video
                          key={index}
                          src={url}
                          controls
                          style={styles.videoPlayer}
                        />
                      ) : (
                        <img
                          key={index}
                          src={url}
                          alt={`Uploaded style ${index + 1}`}
                          style={styles.galleryImage}
                        />
                      )}
                      <button
                        style={styles.removeButton}
                        onClick={() => handleRemoveFile(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Form.Group controlId="notes" className="mb-3">
            <Form.Label>Additional Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add specific requests or details"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
          </Form.Group>

          <Button variant="warning" type="submit">
            Submit Order
          </Button>
        </Form>
      </section>

      <section style={styles.accordionSection}>
        <h3 className="text-center mb-4">Frequently Asked Questions</h3>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              What is the turnaround time for an order?
            </Accordion.Header>
            <Accordion.Body>
              Our typical turnaround time for custom orders is 7-10 business
              days, depending on the complexity of your request.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Can I provide my own fabric?</Accordion.Header>
            <Accordion.Body>
              Yes, you can provide your own fabric. Please mention it in the
              "Fabric Details" section of the order form.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How do I share my measurements?</Accordion.Header>
            <Accordion.Body>
              You can share your measurements in the provided field or upload a
              measurement chart as part of your style inspiration.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Can I request adjustments after delivery?
            </Accordion.Header>
            <Accordion.Body>
              Absolutely! We offer free adjustments within 14 days of delivery
              for any fitting issues.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </div>
  );
};

export default OrderPage;
