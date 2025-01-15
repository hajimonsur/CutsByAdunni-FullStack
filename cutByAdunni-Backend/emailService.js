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
    // Email content for the admin/notification email
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.NOTIFICATION_EMAIL, // Admin or notification recipient
      subject: 'New Order Received',
      text: `A new order has been placed! Here are the details:
      - Order ID: ${Order._id}
      - Customer Name: ${Order.customerName}`,
    };

    // Email content for the customer
    const userMailOptions = {
      from: process.env.EMAIL,
      to: Order.email, // Customer's email address
      subject: 'Order Confirmation',
      text: `Dear ${Order.customerName},
      
Thank you for placing an order with us! Here are your order details:
- Order ID: ${Order._id}
- Fabric Details: ${Order.fabricDetails}
- Measurements: ${Order.measurements}
- Additional Notes: ${Order.additionalNotes}

We will process your order and keep you updated. If you have any questions, feel free to reply to this email.

Best regards,
The CutByAdunni Team`,
    };

    // Send both emails
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('Notification email sent to admin:', adminInfo.response);

    const userInfo = await transporter.sendMail(userMailOptions);
    console.log('Acknowledgment email sent to user:', userInfo.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendOrderNotification;
