const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customerName: { 
    type: String,
     required: true
 },
 
  email: { 
    type: String,
     required: true
     },

  phone: { 
    type: String,
     required: true
     },

  date: { 
    type: Date,
     required: true
     },

  time: { 
    type: String,
     required: true
     },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
