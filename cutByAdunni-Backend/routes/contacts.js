const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// POST route to handle contact messages
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    // Email options for admin
    const mailOptions = {
      from: `${email}`, // Sender's email
      to: process.env.EMAIL, // Admin or recipient email
      replyTo:`${email}`,
      subject: `New Contact Message from ${name} - ${email}`,
      text: `You have received a new message:
      - Name: ${name}
      - Email: ${email}
      - Message: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});

module.exports = router;
