const express = require("express");
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");

const router = express.Router();

// Routes
router.post("/", auth, createOrder); // Create a new order (Customer)
router.get("/", auth, getUserOrders); // Get orders for the logged-in user (Customer)
router.get("/all", auth, getAllOrders); // Get all orders (Admin only)
router.put("/:id", auth, updateOrderStatus); // Update order status (Admin only)
router.delete("/:id", auth, deleteOrder); // Delete an order (Admin only)

module.exports = router;
