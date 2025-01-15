const express = require("express");
const { login, signup, userDetails, viewAllUsers } = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// Public Routes
router.post("/register", signup);
router.post("/login", login);


// Protected Routes
router.get("/me", auth, userDetails);
router.get("/all", auth, viewAllUsers);

module.exports = router;
