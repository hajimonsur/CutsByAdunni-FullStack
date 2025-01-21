const Order = require("../models/Order");
const {sendOrderNotification} = require('../emailService');


// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      fabricDetails,
      measurements,
      additionalNotes,
      customerName,
      email,
      styleInspo,
      date,
      time,
    } = req.body;

    const newOrder = await Order.create({
      user: req.userId, // User ID from auth middleware
      fabricDetails,
      measurements,
      additionalNotes,
      customerName,
      email,
      styleInspo,
      date,
      time,
      status: "pending", // Default status
    });

    await sendOrderNotification(newOrder);
    res
      .status(201)
      .json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const orders = await Order.find().populate("user", "name email"); // Include user details
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders for a specific user (Customer)
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// view single order (admin)
exports.viewSingleOrder = async (req, res) => {
  try {

    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { id } = req.params; 

    // Find the order by its ID in the database
    const order = await Order.findById(id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the order data as a response
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order (Admin only)
exports.deleteOrder = async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
