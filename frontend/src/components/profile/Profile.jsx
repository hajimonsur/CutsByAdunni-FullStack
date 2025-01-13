import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch user information
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();

    // Fetch orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [apiUrl]);

  if (!user) return <div className="text-center">Loading...</div>;

  return (
    <div className="container my-5">
      {/* User Profile Section */}
      <div className="row mb-5">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="text-primary mb-3">{user.name}</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="orders">
        <h3 className="mb-4">Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="list-group">
            {orders.map((order) => (
              <li
                key={order.id}
                className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2"
                style={{ cursor: "pointer" }}
                onClick={() => console.log(`Navigating to order ${order.id}`)}
              >
                <div>
                  <strong>Order ID:</strong> {order._id}
                  <br />
                  <small>
                    Date:{" "}
                    {new Date(order.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    -{" "}
                    {new Date(order.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </small>
                </div>

                <span
                  className={`badge rounded-pill ${
                    order.status === "Completed"
                      ? "bg-success"
                      : order.status === "Pending"
                      ? "bg-warning"
                      : "bg-secondary"
                  }`}
                >
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
