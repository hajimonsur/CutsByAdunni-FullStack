const express = require("express");
const { createTestimony, getAllTestimonies, getUserTestimonies, deleteTestimony,  } = require("../controllers/testimonyController");
const auth = require("../middleware/auth");

const router = express.Router();

// Public route for customers to create a testimony
router.post("/", auth, createTestimony);

// Admin route to get all testimonies
router.get("/", auth, getAllTestimonies);

// Admin route to get specific user testimonies
router.get("/user/:id", auth, getUserTestimonies);

// Admin route to delete a testimony
router.delete("/:id", auth, deleteTestimony);

module.exports = router;