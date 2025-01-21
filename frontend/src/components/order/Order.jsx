import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaRuler, FaPalette, FaTruck } from "react-icons/fa";

const OrderPage = () => {
  const styles = {
    hero: {
      padding: "50px 20px",
      textAlign: "center",
      backgroundColor: "#f1f1f1",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    section: {
      padding: "40px 20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      margin: "2rem auto",
      maxWidth: "1200px",
    },
    formContainer: {
      maxWidth: "600px",
      margin: "0 auto",
    },
    icon: {
      fontSize: "60px",
      color: "#FFC107",
      marginBottom: "15px",
    },
    stepContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: "30px",
      gap: "2rem",
    },
    galleryImage: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      margin: "5px",
      borderRadius: "8px",
    },
    videoPlayer: {
      width: "100px",
      height: "auto",
      margin: "5px",
      borderRadius: "8px",
    },
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fabricDetails, setFabricDetails] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [styleInspo, setStyleInspo] = useState([]);

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
        alert("Order submitted successfully!");
        handleClear();
      } else {
        alert("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Please try again.");
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

  return (
    <div>
      <section style={styles.hero}>
        <h1>Place Your Custom Order</h1>
        <p>
          Experience the finest tailoring with CutByAdunni. Your perfect fit,
          designed just for you.
        </p>
        <Button variant="warning" size="lg" href="#customize-order-section">
          Place Your Order
        </Button>
      </section>

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

            <div className="mb-3">
              <label htmlFor="upload" className="form-label d-block mb-2">
                <b>Upload Style Inspo</b>
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
                    {styleInspo.map((url, index) => {
                      const isVideo = url.includes("video");
                      return isVideo ? (
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
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

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

            <Button variant="warning" type="submit" className="mt-3">
              Submit Order
            </Button>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
