import Subscription from "../models/subscriptionSchema.js";
import validator from "validator";
import nodemailer from "nodemailer";

/**
 * Let a user subscribe by adding his email to the subscription table and sending a welcome email
 */
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    const checkUserExistence = await Subscription.findOne({ email });

    if (checkUserExistence) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newSubscription = await Subscription.create({ email });

    // Send a welcome email
    sendWelcomeEmail(email);

    return res.status(201).json({ message: "Email added successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * Send a welcome email
 */
const sendWelcomeEmail = (email) => {
  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "aymansayegh2002@hotmail.com",
    to: email,
    subject: "🎉 Welcome to ElectroStore Exclusive Community!",
    html: `
        <p>Dear Subscriber,</p>
  
        <p>Congratulations and welcome to ElectroStore's exclusive community! 🎉</p>
  
        <p>Thank you for subscribing. We're excited to have you on board, and we can't wait to share all the latest updates, offers, and news about our innovative products with you.</p>
  
        <p>What can you expect as a part of our community?</p>
  
        <ul>
          <li>🎁 Exclusive offers and discounts</li>
          <li>🚀 Sneak peeks into our latest product launches</li>
          <li>📰 Regular updates on industry trends and technology</li>
        </ul>
  
        <p>Stay tuned for exciting surprises and personalized recommendations tailored just for you!</p>
  
        <p>If you ever have questions or feedback, feel free to reach out to us. We value your presence in the ElectroStore family and look forward to making your shopping experience extraordinary.</p>
  
        <p>Thank you again for choosing ElectroStore. Let the shopping adventures begin!</p>
  
        <p>Best regards,<br>The ElectroStore Team</p>
      `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending welcome email:", error);
    } else {
      console.log("Welcome email sent");
    }
  });
};
