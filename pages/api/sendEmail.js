// pages/api/sendEmail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("Request received:", req.body); // Log the incoming request

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Create a transporter object using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: "mpremmariyan@gmail.com", // Your Gmail address
      pass: "Tbdam@583225", // Your Gmail password
    },
  });

  // Email content
  const mailOptions = {
    from: "mpremmariyan@gmail.com", // Sender address
    to: "mpremmariyan@gmail.com", // Receiver address (your email)
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    console.log("Sending email..."); // Log before sending email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!"); // Log success
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error); // Log the full error
    res.status(500).json({ message: "Failed to send email. Please check the server logs." });
  }
}