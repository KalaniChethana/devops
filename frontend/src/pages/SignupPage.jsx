import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
    phoneNumber: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    // Name validation
    if (!form.name.trim()) {
      setError("Name is required");
      return false;
    }

    // Email validation
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Invalid email address");
      return false;
    }

    // Password validation
    if (!form.password) {
      setError("Password is required");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // Confirm password validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Provider-specific validation
    if (form.role === "provider") {
      if (!form.phoneNumber.trim()) {
        setError("Phone number is required for service providers");
        return false;
      }
      if (!form.address.trim()) {
        setError("Service address is required for service providers");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
        role: form.role,
        phoneNumber: form.phoneNumber.trim() || "",
        address: form.address.trim() || "",
      };

      console.log("Signup payload:", payload); // DEBUG

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Signup response:", data); // DEBUG

      if (res.ok) {
        setSuccess("✅ Account created successfully! Redirecting to login...");
        
        // Reset form
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "client",
          phoneNumber: "",
          address: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.error || data.message || "Signup failed! Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Animated Background */}
      <div className="animated-bg"></div>
      <div className="animated-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      <div className="signup-container">
        {/* Header */}
        <div className="signup-header">
          <Link to="/" className="logo">🏘️</Link>
          <h1>Create Account</h1>
          <p>Join our community of trusted service providers and clients</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span>❌</span> {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="success-message">
            <span>✅</span> {success}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="signup-form">
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">👤 Full Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">📧 Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="form-group">
            <label htmlFor="role">👨‍💼 I am a *</label>
            <div className="role-options">
              <label className={`role-option ${form.role === "client" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={form.role === "client"}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span className="role-icon">👤</span>
                <span className="role-label">Client</span>
                <span className="role-desc">Looking for services</span>
              </label>

              <label className={`role-option ${form.role === "provider" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="provider"
                  checked={form.role === "provider"}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span className="role-icon">🔧</span>
                <span className="role-label">Service Provider</span>
                <span className="role-desc">Offering services</span>
              </label>
            </div>
          </div>

          {/* Phone Number (Provider Only) */}
          {form.role === "provider" && (
            <div className="form-group provider-field">
              <label htmlFor="phoneNumber">📱 Phone Number *</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="(123) 456-7890"
                value={form.phoneNumber}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          )}

          {/* Address (Provider Only) */}
          {form.role === "provider" && (
            <div className="form-group provider-field">
              <label htmlFor="address">📍 Service Address *</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St, City, State 12345"
                value={form.address}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          )}

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">🔐 Password *</label>
            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">🔒 Confirm Password *</label>
            <div className="password-wrapper">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="terms-check">
            <input type="checkbox" id="terms" required disabled={loading} />
            <label htmlFor="terms">
              I agree to the <Link to="#">Terms of Service</Link> and{" "}
              <Link to="#">Privacy Policy</Link>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="login-prompt">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="signup-footer">
          <p>
            <Link to="#">Privacy Policy</Link> • 
            <Link to="#">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
}