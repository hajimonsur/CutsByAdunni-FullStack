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
import { FaCheckCircle, FaTimesCircle, FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, handleViewOrderDetails, formatDate }) => {
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
          <strong>Order Date:</strong> {formatDate(order.date) || "N/A"}
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleViewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    const adminDetails = JSON.parse(localStorage.getItem("user"));
    if (adminDetails) {
      setAdmin(adminDetails);
    }
    fetchDashboardData();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

      // Sort and limit orders to 5 most recent
      const sortedOrders = data
        .filter((order) => order.date) // Ensure orders have valid dates
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
        .slice(0, 5); // Get top 5

      setOrders(sortedOrders);
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
      <Row className="navbar-row">
        <Col>
          <h2 className="navbar-title">Admin Dashboard</h2>
          <Button
            className="toggle-sidebar-btn d-md-none"
            onClick={toggleSidebar}
          >
            <FaBars />
          </Button>
        </Col>
      </Row>
      <Row>
        {isSidebarOpen && (
          <Col
            md={3}
            className={`sidebar-col ${
              isSidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
          >
            <AdminSidebar />
          </Col>
        )}
        <Col md={isSidebarOpen ? 9 : 12} className="dashboard-col">
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
                            formatDate={formatDate}
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
