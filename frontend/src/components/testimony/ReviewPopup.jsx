import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ReviewPopup = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    testimony: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/testimony`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          testimony: formData.testimony,
        }),
      });

      if (response.ok) {
        alert("Review uploaded successfully!");
        handleClear();
      } else {
        alert("Failed to upload review.");
      }
    } catch (error) {
      console.error("Error uploading review:", error);
      alert("Error uploading review.");
    }
    handleClose();
  };

  useEffect(() => {
    const lastShownTime = localStorage.getItem("lastReviewPopupTime");
    const currentTime = Date.now();

    // If the modal has not been shown before or 2 hours have passed
    if (!lastShownTime || currentTime - lastShownTime > 2 * 60 * 60 * 1000) {
      handleShow();
      localStorage.setItem("lastReviewPopupTime", currentTime); // Update the timestamp
    }

    // Setting an interval to check if it's time to show the modal again
    const interval = setInterval(() => {
      const updatedLastShownTime = localStorage.getItem("lastReviewPopupTime");
      if (updatedLastShownTime && currentTime - updatedLastShownTime > 2 * 60 * 60 * 1000) {
        handleShow();
        localStorage.setItem("lastReviewPopupTime", Date.now());
      }
    }, 60 * 60 * 1000); // Check every hour

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="review-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Share Your Thoughts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="m-3" controlId="name">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="rounded-3 p-2"
              />
            </Form.Group>

            <Form.Group className="m-3" controlId="testimony">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                name="testimony"
                value={formData.testimony}
                onChange={handleChange}
                placeholder="Share your review"
                rows={4}
                required
                className="rounded-3 p-2"
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="outline-secondary" onClick={handleClose} className="m-2 w-25">
                Cancel
              </Button>
              <Button variant="success" type="submit" className="w-25 m-2">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Styling */}
      <style jsx>{`
        .review-modal .modal-content {
          background-color: #f8f9fa;
          border-radius: 10px;
          border: 1px solid #ced4da;
        }

        .review-modal .modal-header {
          background-color: #f5c518;
          color: white;
          font-weight: bold;
        }

        .review-modal .modal-title {
          font-size: 1.25rem;
        }

        .review-modal .btn-outline-secondary {
          border-radius: 5px;
          border-color: #ced4da;
        }

        .review-modal .btn-success {
          background-color: #f5c518;
          border-color: #f5c518;
        }

        .review-modal .btn-outline-secondary:hover {
          background-color: #e2e6ea;
        }

        .review-modal .btn-success:hover {
          background-color: #d9a500;
        }

        .review-modal .form-control {
          font-size: 1rem;
        }

        /* Make modal responsive */
        @media (max-width: 576px) {
          .review-modal .modal-dialog {
            width: 90%; /* Adjust width for mobile */
            max-width: 400px; /* Make the modal smaller */
          }

          .review-modal .btn-outline-secondary, .review-modal .btn-success {
            width: 45%; /* Adjust button width on small screens */
          }
        }

        /* Ensure modal is centered */
        .review-modal .modal-dialog {
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default ReviewPopup;
