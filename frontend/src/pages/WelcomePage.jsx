import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

export default function WelcomePage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    { icon: "🔧", name: "Plumbing", desc: "Quick plumbing solutions" },
    { icon: "⚡", name: "Electrical", desc: "Professional electricians" },
    { icon: "🏠", name: "Repairs", desc: "Home maintenance" },
    { icon: "🧹", name: "Cleaning", desc: "Professional cleaners" },
    { icon: "🎨", name: "Painting", desc: "Interior & exterior" },
    { icon: "🔐", name: "Security", desc: "Safety systems" },
  ];

  const testimonials = [
    { name: "John Smith", text: "Amazing service, very professional!", rating: 5 },
    { name: "Sarah Johnson", text: "Found the perfect plumber quickly!", rating: 5 },
    { name: "Mike Brown", text: "Great experience, highly recommended", rating: 5 },
  ];

  return (
    <div className="welcome-container">
      {/* Animated Background */}
      <div className="animated-bg"></div>
      <div className="animated-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Main Content */}
      <div className="welcome-content">
        {/* Hero Section */}
        <div className="welcome-header">
          <div className="header-badge">✨ Welcome</div>
          <h1 className="welcome-title">Neighborhood Service Finder</h1>
          <p className="welcome-subtitle">
            Connect with trusted local professionals in seconds. Quality service, rated by your neighbors.
          </p>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Services</span>
            </div>
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.8★</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-section">
          <h2>Popular Services</h2>
          <div className="services-grid">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`service-card ${hoveredCard === idx ? "active" : ""}`}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <h3>Verified Professionals</h3>
              <p>All service providers are background checked and rated by our community</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3>Instant Booking</h3>
              <p>Book services in minutes without lengthy processes</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3>Secure Payments</h3>
              <p>Safe and encrypted transactions with buyer protection</p>
            </div>
            <div className="feature-card">
              <div className="feature-number">04</div>
              <h3>Customer Support</h3>
              <p>24/7 support team ready to help you anytime</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="stars">
                  {"⭐".repeat(testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of satisfied customers today</p>
          <div className="welcome-buttons">
            <Link to="/login" className="welcome-button login-btn">
              <span>🔓</span> Login
            </Link>
            <Link to="/signup" className="welcome-button signup-btn">
              <span>✨</span> Sign Up Now
            </Link>
          </div>
        </div>

        <p className="welcome-footer">
          © 2025 Neighborhood Service Finder. Your trust is our priority.
        </p>
      </div>
    </div>
  );
}