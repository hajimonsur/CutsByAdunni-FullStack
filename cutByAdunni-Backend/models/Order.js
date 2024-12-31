const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: { 
    type: String,
     required: true
     },

  email: { 
    type: String,
     required: true
     },

  fabricDetails: {
     type: String,
      required: true
     },

  measurements: { 
    type: Object,
     required: true
     }, // Example: { chest: 40, waist: 30 }

  date: { 
    type: Date,
     required: true
     },

  time: { 
    type: String,
     required: true
     },

     additionalNotes: {
      type: String,
     },

  status: { 
    type: String,
     enum: ["pending", "in progress", "completed"],
      default: "pending" },

});

module.exports = mongoose.model("Order", OrderSchema);
