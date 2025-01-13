import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  Badge,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const SingleOrder = () => {
  const { id } = useParams(); // Extract the order ID from the URL
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Modal state for full-screen image
  const [imageUrl, setImageUrl] = useState("");
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false); // State for delete confirmation modal
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/orders/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();

        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, apiUrl]);

  // Open the full-screen modal
  const openModal = () => {
    setImageUrl(order.styleInspo);
    setModalOpen(true);
  };

  // Close the full-screen modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle Delete Order
  const handleDeleteOrder = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      // Redirect to the dashboard after successful deletion
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle the Order Status between "Completed" and other statuses
  const toggleOrderStatus = async () => {
    const newStatus =
      order.status === "Completed" ? "In Progress" : "Completed";

    try {
      const response = await fetch(`${apiUrl}/api/orders/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const updatedOrder = await response.json();
      setOrder(updatedOrder); // Update the order state with the new status
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle Delete Confirmation Modal
  const toggleConfirmDeleteModal = () => {
    setConfirmDeleteModal(!confirmDeleteModal);
  };

  if (loading) return <h3 className="text-center">Loading order details...</h3>;
  if (error) return <h3 className="text-center text-danger">{error}</h3>;

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <Button
            variant="warning"
            onClick={() => navigate("/admin")}
            className="btn-lg shadow-lg"
          >
            Back to Dashboard
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md="8" className="mx-auto">
          <Card className="shadow-lg border-0 rounded-lg p-4">
            <CardBody>
              <h3 className="text-center mb-4">Order Details</h3>

              {/* Order ID */}
              <Row className="mb-3">
                <Col sm="4" className="fw-bold text-dark">
                  Order ID:
                </Col>
                <Col>{order._id}</Col>
              </Row>

              {/* Customer Info */}
              <Row className="mb-3">
                <Col sm="4" className="fw-bold text-dark">
                  Customer:
                </Col>
                <Col>{order.customerName}</Col>
              </Row>

              <Row className="mb-3">
                <Col sm="4" className="fw-bold text-dark">
                  Email:
                </Col>
                <Col>{order.email}</Col>
              </Row>

              {/* Order Status */}
              <Row className="mb-3">
                <Col sm="4" className="fw-bold text-dark">
                  Status:
                </Col>
                <Col>
                  <Badge
                    color={order.status === "Completed" ? "success" : "warning"}
                    className="py-2 px-4 rounded-pill text-uppercase"
                  >
                    {order.status}
                  </Badge>
                </Col>
              </Row>

              {/* Style Inspiration (Image) */}
              {order.styleInspo && (
                <Row className="mb-3">
                  <Col sm="4" className="fw-bold text-dark">
                    Style Inspiration:
                  </Col>
                  <Col>
                    <div className="text-center">
                      <img
                        src={order.styleInspo}
                        alt="Style Inspiration"
                        className="img-fluid rounded shadow-lg"
                        style={{
                          maxHeight: "400px",
                          width: "100%",
                          objectFit: "cover", // Ensures the image covers the space nicely
                          borderRadius: "12px", // Rounded corners
                          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)", // Subtle shadow
                          cursor: "pointer", // Change the cursor to indicate clickability
                        }}
                        onClick={() => openModal(order.styleInspo)} // Open the image in a modal
                      />
                    </div>
                  </Col>
                </Row>
              )}

              {/* Toggle Status Button */}
              <div className="text-center mt-4">
                <Button
                  variant="info"
                  onClick={toggleOrderStatus}
                  className="btn-lg"
                >
                  {order.status === "Completed"
                    ? "Mark as In Progress"
                    : "Mark as Completed"}
                </Button>
              </div>

              {/* Delete Order Button */}
              <div className="text-center mt-4">
                <Button
                  variant="danger"
                  onClick={toggleConfirmDeleteModal}
                  className="btn-lg"
                >
                  Delete Order
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Full-Screen Modal */}
      <Modal isOpen={modalOpen} toggle={closeModal} size="lg">
        <ModalHeader toggle={closeModal}></ModalHeader>
        <ModalBody>
          <div className="text-center">
            <img
              src={imageUrl}
              alt="Style Inspiration"
              className="img-fluid rounded"
              style={{ maxHeight: "80vh", objectFit: "contain" }} // Keep the image fully visible
            />
          </div>
        </ModalBody>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={confirmDeleteModal}
        toggle={toggleConfirmDeleteModal}
        size="sm"
      >
        <ModalHeader toggle={toggleConfirmDeleteModal}>
          Confirm Deletion
        </ModalHeader>
        <ModalBody>Are you sure you want to delete this order?</ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggleConfirmDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteOrder}>
            Yes, Delete
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default SingleOrder;
