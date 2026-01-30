import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Login failed. Please try again.");
        return;
      }

      // Normalize response shapes
      const token = data.token || data.accessToken || "";
      const user = data.user || {
        role: data.role,
        name: data.name || data.username,
        email: data.email,
        id: data.id || data._id,
      };

      if (!token || !user) {
        setError("Invalid login response from server.");
        return;
      }

      // Persist auth info
      localStorage.setItem("token", token);
      if (user.role) localStorage.setItem("role", user.role);
      if (user.name) localStorage.setItem("userName", user.name);
      if (user.email) localStorage.setItem("userEmail", user.email);
      if (user.id || user._id) localStorage.setItem("userId", user.id || user._id);

      // Route based on role
      const role = (user.role || "").toLowerCase();
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "provider" || role === "service-provider") {
        navigate("/provider-dashboard");
      } else {
        navigate("/client-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="animated-bg"></div>
      <div className="animated-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      <div className="login-container">
        <div className="login-header">
          <Link to="/" className="logo">🏘️</Link>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">📧 Email or Username</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="you@example.com or username"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔐 Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="#" className="forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button type="button" className="social-button google">
            <span>🔍</span> Continue with Google
          </button>
          <button type="button" className="social-button facebook">
            <span>📱</span> Continue with Facebook
          </button>
        </div>

        <div className="signup-prompt">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Create one now
            </Link>
          </p>
        </div>

        <div className="login-footer">
          <p>
            <Link to="#">Privacy Policy</Link> • 
            <Link to="#">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  );
}