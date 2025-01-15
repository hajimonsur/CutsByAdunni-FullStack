const nodemailer = require('nodemailer');
require('dotenv').config();

// Create the transporter object using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

// Function to send an order notification email
const sendOrderNotification = async (Order) => {
  try {
    // Set up the email content
    const mailOptions = {
      from: process.env.EMAIL,           
      to: process.env.NOTIFICATION_EMAIL, 
      subject: 'New Order Received',
      text: `A new order has been placed! Here are the details:
      - Order ID: ${Order._id}
      - Customer Name: ${Order.customerName}`
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendOrderNotification;
