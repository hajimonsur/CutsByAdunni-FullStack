import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Badge,
} from "reactstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Icons for order status
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
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
      const ordersResponse = await fetch(
        `${apiUrl}/api/orders/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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

  const UpdatePortfolio = () => {
    navigate("/update");
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <AdminSidebar />
        </Col>
        <Col md={9}>
          {admin ? (
            <>
              <Card className="mb-4">
                <CardBody>
                  <h3>Welcome, {admin.username}</h3>
                  <Button color="warning" className="mb-3" onClick={UpdatePortfolio}>
                    Update Portfolio
                  </Button>
                  {/* 
                  <Button color="warning" className="mb-3">
                    Manage Posts
                  </Button>
                  <Button color="warning" className="mb-3">
                    Settings
                  </Button>
                  <Button color="danger" onClick={handleLogout}>
                    Logout
                  </Button> */}
                </CardBody>
              </Card>

              <Row>
                {/* Orders Section */}
                <Col sm={12}>
                  <Card>
                    <CardHeader>Recent Orders</CardHeader>
                    <CardBody>
                      <Row>
                        {orders.length > 0 ? (
                          orders.map((order, index) => (
                            <Col
                              sm={12}
                              md={6}
                              lg={4}
                              key={index}
                              className="mb-4"
                            >
                              <Card className="order-card">
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
            </>
          ) : (
            <h3>Loading...</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
