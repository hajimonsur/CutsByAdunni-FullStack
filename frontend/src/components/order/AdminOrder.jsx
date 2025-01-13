import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaShoppingCart, FaCheckCircle, FaHourglassStart, FaCheck } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]); // All orders
  const [filteredOrders, setFilteredOrders] = useState([]); // Orders to display after filtering
  const [filter, setFilter] = useState("all"); // State to track the selected filter
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/orders/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data); // Initially display all orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [apiUrl]);

  // Filter orders based on the selected filter
  useEffect(() => {
    if (filter === "all") {
      setFilteredOrders(orders); // Show all orders
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status.toLowerCase() === filter)
      ); // Filter orders by status
    }
  }, [filter, orders]); // Trigger this effect whenever filter or orders change

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <FaClipboardList size={32} className="text-primary me-3" />
        <h1 className="m-0">Orders Dashboard</h1>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4">
        <button
          className={`btn btn-outline-primary me-2 ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Orders
        </button>
        <button
          className={`btn btn-outline-success me-2 ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed Orders
        </button>
        <button
          className={`btn btn-outline-warning me-2 ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending Orders
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">
                <FaShoppingCart className="me-2" />
                Order ID
              </th>
              <th scope="col">Customer</th>
              <th scope="col">Email</th>
              <th scope="col">Order Date & Time</th> {/* New column */}
              <th scope="col">
                <FaCheckCircle className="me-2" />
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                style={{ cursor: "pointer" }}
                className="table-row-hover"
              >
                <td>{order._id}</td>
                <td>
                  {order.customerName.charAt(0).toUpperCase() +
                    order.customerName.slice(1)}
                </td>
                <td>{order.email}</td>
                <td>{formatDate(order.date)}</td> {/* Display formatted date */}
                <td>
                  {order.status && order.status.toLowerCase() === "pending" && (
                    <span className="badge rounded-pill bg-warning text-dark">
                      <FaHourglassStart className="me-2" />
                      Pending
                    </span>
                  )}
                  {order.status && order.status.toLowerCase() === "completed" && (
                    <span className="badge rounded-pill bg-success">
                      <FaCheck className="me-2" />
                      Completed
                    </span>
                  )}
                  {order.status && order.status.toLowerCase() === "cancelled" && (
                    <span className="badge rounded-pill bg-secondary">
                      Cancelled
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrder;
