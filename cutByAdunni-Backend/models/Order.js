const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  fabricDetails: {
    type: String,
    required: true,
  },

  measurements: {
    type: Object,
    required: true,
  }, // Example: { chest: 40, waist: 30 }

  styleInspo: {
    type: [String]

  },

  date: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },

  time: {
    type: String,
    default: () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }, // This sets the time in HH:mm:ss format
  },
  additionalNotes: {
    type: String,
  },

  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },



  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure 'User' is the correct model name
  },
});

module.exports = mongoose.model("Order", OrderSchema);
