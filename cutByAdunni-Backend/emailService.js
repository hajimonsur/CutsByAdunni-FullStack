const nodemailer = require("nodemailer");
require("dotenv").config();

// Create the transporter object using your email service
const transporter = nodemailer.createTransport({
  service: "gmail",
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
      subject: "New Order Received",
      text: `A new order has been placed! Here are the details:
      - Order ID: ${Order._id}
      - Customer Name: ${Order.customerName}
      - Customer Email: ${Order.email}`,
    };

    // Email content for the customer
    const userMailOptions = {
      from: process.env.EMAIL,
      to: Order.email, // Customer's email address
      subject: "Order Confirmation",
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
    console.log("Notification email sent to admin:", adminInfo.response);

    const userInfo = await transporter.sendMail(userMailOptions);
    console.log("Acknowledgment email sent to user:", userInfo.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// functon to send password reset email to the user
const sendPasswordResetEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Changed Successfully",
      text: `Hello ${user.customerName || user},

We wanted to let you know that your password has been successfully updated. 

If you made this change, there’s nothing more for you to do—simply log in with your new password to continue enjoying our services.

If you didn’t make this change, please contact our support team immediately by replying to this email, so we can secure your account.

Thank you for trusting us!

Warm regards,  
The CutByAdunni Team`,
      html: `
        <p>Hello <strong>${user.customerName}</strong>,</p>
        <p>We wanted to let you know that your password has been successfully updated.</p>
        <p>If you made this change, there’s nothing more for you to do—simply log in with your new password to continue enjoying our services.</p>
        <p>If you didn’t make this change, please contact our support team immediately by replying to this email, so we can secure your account.</p>
        <p>Thank you for trusting us!</p>
        <p>Warm regards,</p>
        <p><strong>The CutByAdunni Team</strong></p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(
      "Password change confirmation email sent to user:",
      info.response
    );
  } catch (error) {
    console.error("Error sending password change confirmation email:", error);
  }
};

module.exports.sendOrderNotification = sendOrderNotification;
module.exports.sendPasswordResetEmail = sendPasswordResetEmail;
