const express = require("express");
const {
  createPortfolioItem,
  getPortfolioItems,
  getPortfolioItemById,
  updatePortfolioItem,
  deletePortfolioItem,
} = require("../controllers/portfolioController");
const auth = require("../middleware/auth");

const router = express.Router();

// Public Routes
router.get("/", getPortfolioItems);
router.get("/:id", getPortfolioItemById);

// Admin Routes
router.post("/", auth, createPortfolioItem); // Only admin can create
router.put("/:id", auth, updatePortfolioItem); // Only admin can update
router.delete("/:id", auth, deletePortfolioItem); // Only admin can delete

module.exports = router;
