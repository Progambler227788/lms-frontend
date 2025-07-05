import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Login.css";
import Loginimg from "../../assets/images/login.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'; 
import { login } from '../../services/authService'; 

function Login() {

  const navigate = useNavigate();
  const { setUser } = useAuth(); // <-- get setUser

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});(email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } 
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {

    // Update form data based on input changes
    const { name, value, type, checked } = e.target; // Destructure the input properties
    setFormData((prev) => ({
      ...prev, // Spread the previous state
      [name]: type === "checkbox" ? checked : value, // Use checked for checkboxes, value for others
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };


 
const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      const { email, password } = formData;
      const loginResponse = await login({ email, password });

      console.log("Login successful:", loginResponse);

      setUser(loginResponse); // <-- Save user to context + localStorage

      // Redirect based on role
      if (loginResponse.role === 'STUDENT') {
        navigate('/student-dashboard');
      } else if (loginResponse.role === 'INSTRUCTOR') {
        navigate('/instructor-dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      alert(msg);
    }

    console.log("Login form submitted:", formData);
  }
};


  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Please enter your details to sign in</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="login-image">
        <img src={Loginimg} alt="Login illustration" className="illustration" />
      </div>
    </div>
  );
}

export default Login;
