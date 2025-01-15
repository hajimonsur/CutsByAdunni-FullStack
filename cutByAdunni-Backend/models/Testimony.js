const mongoose = require("mongoose");

const TestimonySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    testimony: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Testimony", TestimonySchema);