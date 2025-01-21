import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Spinner,
} from "reactstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, handleViewOrderDetails }) => {
  const formattedDate =
    order.date && order.time
      ? new Date(`${order.date}T${order.time}`).toLocaleString()
      : "Unknown Date";

  return (
    <Card className="order-card shadow-sm">
      <CardBody>
        <h5>Order ID: {order._id}</h5>
        <p>
          <strong>Customer:</strong> {order.customerName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {order.email || "N/A"}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <Badge color={order.status === "Completed" ? "success" : "danger"}>
            {order.status}{" "}
            {order.status === "Completed" ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}
          </Badge>
        </p>
        <p>
          <strong>Order Date:</strong> {formattedDate}
        </p>
        <Button
          color="warning"
          size="sm"
          onClick={() => handleViewOrderDetails(order._id)}
        >
          View Order Details
        </Button>
      </CardBody>
    </Card>
  );
};

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleViewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  useEffect(() => {
    const adminDetails = JSON.parse(localStorage.getItem("user"));
    if (adminDetails) {
      setAdmin(adminDetails);
    }
    fetchDashboardData();
  }, []);

  const fixDateFormat = (dateString) => {
    // Regular expression to remove unwanted characters from date string (like "ZT18:32:31")
    const correctedDateString = dateString.replace(/Z.*$/, ""); // Keep only valid date part

    // Try to create a valid Date object
    const date = new Date(correctedDateString);
    return date instanceof Date && !isNaN(date) ? date : null; // Return valid date or null if invalid
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/orders/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }

      const data = await response.json();
      console.log("Fetched Orders:", data);

      // Sort orders by most recent date/time
      const sortedOrders = data
        .map((order) => {
          const formattedDate = `${order.date}T${order.time}`; // Combine date and time
          const validDateTime = fixDateFormat(formattedDate); // Fix and validate the date
          return { ...order, validDateTime }; // Add validDateTime to each order
        })
        .filter((order) => order.validDateTime !== null) // Filter out invalid dates
        .sort((a, b) => b.validDateTime - a.validDateTime) // Sort by most recent
        .slice(0, 5); // Get the latest 5 orders

      setOrders(sortedOrders); // Update the state with sorted orders
    } catch (err) {
      setError(
        err.message || "Failed to fetch orders. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner color="primary" />
        <h4>Loading...</h4>
      </div>
    );
  }

  if (error) {
    return <h3 className="text-center mt-5 text-danger">{error}</h3>;
  }

  if (!admin) {
    return (
      <h3 className="text-center mt-5">Admin not found. Please log in.</h3>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="sidebar-col">
          <AdminSidebar />
        </Col>
        <Col md={9} className="dashboard-col">
          <Card className="welcome-card mb-4">
            <CardBody>
              <h3>Welcome, {admin.username}</h3>
            </CardBody>
          </Card>

          <Row>
            <Col sm={12}>
              <Card className="mb-4">
                <CardHeader className="text-center bg-warning">
                  Recent Orders
                </CardHeader>
                <CardBody>
                  <Row>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <Col
                          sm={12}
                          md={6}
                          lg={4}
                          key={order._id}
                          className="mb-4 order-col"
                        >
                          <OrderCard
                            order={order}
                            handleViewOrderDetails={handleViewOrderDetails}
                          />
                        </Col>
                      ))
                    ) : (
                      <Col className="text-center">
                        <h5>No orders yet.</h5>
                      </Col>
                    )}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
