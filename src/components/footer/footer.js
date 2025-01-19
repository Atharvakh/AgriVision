import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="AV-info">
        <h3>About Agrivision</h3>
        <p>
          Agrivision is a platform dedicated to empowering farmers with advanced
          tools and resources to revolutionize agriculture.
        </p>
      </div>
      <div className="TPLinks">
        <h4>Quick Links</h4>
        <ul>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <h4>My Account</h4>
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Sign Up</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
