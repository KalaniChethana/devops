import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

export default function WelcomePage() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title"> Neighborhood Service Finder</h1>
      <p className="welcome-subtitle">
        Find and request trusted local service providers.
      </p>
      <div className="welcome-buttons">
        <Link to="/login" className="welcome-button">Login</Link>
        <Link to="/signup" className="welcome-button">Sign Up</Link>
      </div>
    </div>
  );
}
