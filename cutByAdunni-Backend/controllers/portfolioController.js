const Portfolio = require("../models/Portfolio");

// Create a portfolio item
exports.createPortfolioItem = async (req, res) => {
  try {
    const { title, description, category, images } = req.body;

    const newPortfolioItem = await Portfolio.create({
      title,
      description,
      category,
      images,
    });

    res.status(201).json({ message: "Portfolio item created", data: newPortfolioItem });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all portfolio items
exports.getPortfolioItems = async (req, res) => {
  try {
    const portfolioItems = await Portfolio.find();
    res.status(200).json(portfolioItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single portfolio item
exports.getPortfolioItemById = async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);

    if (!portfolioItem) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    res.status(200).json(portfolioItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a portfolio item
exports.updatePortfolioItem = async (req, res) => {
  try {
    const updatedPortfolioItem = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedPortfolioItem) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    res.status(200).json({ message: "Portfolio item updated", data: updatedPortfolioItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a portfolio item
exports.deletePortfolioItem = async (req, res) => {
  try {
    const deletedPortfolioItem = await Portfolio.findByIdAndDelete(req.params.id);

    if (!deletedPortfolioItem) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    res.status(200).json({ message: "Portfolio item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
