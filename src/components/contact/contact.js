import React, { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const maxLength = 400;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "message" && value.length > maxLength) {
      setError(`Message cannot exceed ${maxLength} characters.`);
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (formData.message.length > maxLength) {
      setError(`Message cannot exceed ${maxLength} characters.`);
      return;
    }

    try {
      const response = await fetch(
        "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/serviceMsgSend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: formData.message }),
        }
      );

      if (response.ok) {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else if (response.status === 400) {
        setError("User not found.");
      } else if (response.status === 401) {
        setError("Unauthorized. Please log in.");
      } else if (response.status === 404) {
        setError("API endpoint not found.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setError("Network error. Please check your connection.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contactInfo">
        <div className="showText">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you! Please fill out the form.</p>
        </div>
        <div className="feedbackForm">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              maxLength={maxLength}
              placeholder="Enter your message (max 400 characters)"
              required
            ></textarea>
            <p>
              {formData.message.length}/{maxLength} characters
            </p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="websites">
        <h2>Other Ways to Reach Us</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 (123) 456-7890</p>
        <p>
          Follow us on social media:
          <FacebookIcon className="social-icon" />
          <XIcon className="social-icon" />
          <InstagramIcon className="social-icon" />
        </p>
      </div>
    </div>
  );
};

export default Contact;
