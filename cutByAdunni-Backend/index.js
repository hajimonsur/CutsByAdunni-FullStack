const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");


dotenv.config();
connectDB();

const app = express();


app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/portfolio", require("./routes/portfolio"));
app.use("/api/users", require("./routes/users"));
app.use("/api/testimony", require("./routes/testimony"));
app.use("/api/contact", require("./routes/contacts"));





// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
