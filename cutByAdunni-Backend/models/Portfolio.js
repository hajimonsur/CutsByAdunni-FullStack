const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["casual", "formal", "bridal", "traditional", "others"], // Define categories for easy filtering
      },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);