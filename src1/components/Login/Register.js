import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Login/Register.css";

const SignUpPage = () => {
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Form Submitted Successfully:", formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,20}$/i;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!values.name) {
      errors.name = "Name is required!";
    } else if (!nameRegex.test(values.name)) {
      errors.name = "This is not a valid Name.";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email.";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be 6-20 characters long, with uppercase, lowercase, numbers, and special characters.";
    }
    return errors;
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Success message */}
        {Object.keys(formErrors).length === 0 && isSubmit && (
          <div className="message success">Signed in Successfully</div>
        )}

        {/* Signup form */}
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formValues.name}
              onChange={handleChange}
            />
            <p className="error-text">{formErrors.name}</p>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
            />
            <p className="error-text">{formErrors.email}</p>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p className="error-text">{formErrors.password}</p>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
