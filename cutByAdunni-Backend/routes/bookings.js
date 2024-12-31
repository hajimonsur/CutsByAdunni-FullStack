const express = require("express");
const { createBooking, getBookings, updateBooking } = require("../controllers/bookingController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", createBooking); // Public route for customers
router.get("/", auth, getBookings); // Admin route
router.put("/:id", auth, updateBooking); // Admin route

module.exports = router;
