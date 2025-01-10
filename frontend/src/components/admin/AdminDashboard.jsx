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
} from "reactstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import "./AdminDashboard.css"; // Add custom CSS for additional styling

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const adminDetails = JSON.parse(localStorage.getItem("user"));
    if (adminDetails) {
      setAdmin(adminDetails);
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const ordersResponse = await fetch(`${apiUrl}/api/orders/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const ordersData = await ordersResponse.json();
      if (ordersData && ordersData.length) {
        setOrders(ordersData);
      } else {
        setOrders([]);
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch orders. Please try again later.");
      setLoading(false);
    }
  };


  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  if (!admin) {
    return <h3>Admin not found. Please log in.</h3>;
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
            {/* Orders Section */}
            <Col sm={12}>
              <Card className="mb-4">
                <CardHeader className="text-center bg-warning ">
                  Recent Orders
                </CardHeader>
                <CardBody>
                  <Row>
                    {orders.length > 0 ? (
                      orders
                        .slice(0, 5) // Display only the first 5 orders (most recent)
                        .map((order, index) => (
                          <Col
                            sm={12}
                            md={6}
                            lg={4}
                            key={index}
                            className="mb-4 order-col"
                          >
                            <Card className="order-card shadow-sm">
                              <CardBody>
                                <h5>Order ID: {order._id}</h5>
                                <p>
                                  <strong>Customer:</strong>{" "}
                                  {order.customerName}
                                </p>
                                <p>
                                  <strong>Email:</strong> {order.email}
                                </p>
                                <p>
                                  <strong>Status:</strong>{" "}
                                  <Badge
                                    color={
                                      order.status === "Completed"
                                        ? "success"
                                        : "danger"
                                    }
                                  >
                                    {order.status}{" "}
                                    {order.status === "Completed" ? (
                                      <FaCheckCircle />
                                    ) : (
                                      <FaTimesCircle />
                                    )}
                                  </Badge>
                                </p>
                                <Button color="warning" size="sm">
                                  View Order Details
                                </Button>
                              </CardBody>
                            </Card>
                          </Col>
                        ))
                    ) : (
                      <Col>
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
