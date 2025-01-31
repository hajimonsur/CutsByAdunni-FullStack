const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const axios = require("axios");





dotenv.config();
connectDB();

const app = express();


app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/orders", require("./routes/orders"));
app.use("/api/portfolio", require("./routes/portfolio"));
app.use("/api/users", require("./routes/users"));
app.use("/api/testimony", require("./routes/testimony"));
app.use("/api/contact", require("./routes/contacts"));
// app.post("/tryon", async (req, res) => {
//     try {
//       const { userImage, clothImage } = req.body;
//       const response = await axios.post(
//         "https://api.segmind.com/tryon",
//         { user_image: userImage, cloth_image: clothImage },
//         { headers: { Authorization: `Bearer ${API_KEY}` } }
//       );
//       res.json(response.data);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });





// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
