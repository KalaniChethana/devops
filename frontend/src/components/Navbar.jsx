import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ onSearch, searchValue, userData, showProfileMenu, setShowProfileMenu, handleLogout }) {
  const navigate = useNavigate();
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const userName = userData?.name || localStorage.getItem("userName") || "Guest";
  const userEmail = userData?.email || localStorage.getItem("userEmail") || "";
  const userRole = userData?.role || localStorage.getItem("role") || "guest";

  const handleLogoutClick = () => {
    if (handleLogout) {
      handleLogout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  };

  return (
    <header className="client-header">
      <div className="client-header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-icon">🏘️</span>
          <span className="logo-text">NeighborhoodServices</span>
        </Link>

        {onSearch && (
          <div className="header-search-wrapper">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                className="header-search"
                placeholder="Search services..."
                value={searchValue || ""}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="header-right">
          <button 
            className="header-icon-btn" 
            title="Favorites"
            onMouseEnter={() => setHoveredIcon('fav')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <span className="icon-wrapper">❤️</span>
            <span className="icon-badge">3</span>
          </button>
          <button 
            className="header-icon-btn" 
            title="Notifications"
            onMouseEnter={() => setHoveredIcon('notif')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <span className="icon-wrapper">🔔</span>
            <span className="icon-badge notif-badge">2</span>
          </button>

          <div className="profile-menu-wrapper">
            <button
              className={`profile-btn ${showProfileMenu ? 'active' : ''}`}
              onClick={() => setShowProfileMenu && setShowProfileMenu(!showProfileMenu)}
              title={userName}
            >
              <span className="profile-avatar-sm">👤</span>
              <span className="profile-name-short">{userName}</span>
              <span className={`dropdown-arrow ${showProfileMenu ? 'open' : ''}`}>▼</span>
            </button>

            {showProfileMenu && setShowProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <div className="profile-avatar">👤</div>
                  <div className="profile-info">
                    <p className="profile-name">{userName}</p>
                    <p className="profile-email">{userEmail}</p>
                    <p className="profile-role">
                      <span className="role-badge">{userRole.toUpperCase()}</span>
                    </p>
                  </div>
                </div>

                <div className="profile-dropdown-divider"></div>

                <div className="profile-dropdown-menu">
                  <button className="dropdown-item">📝 My Bookings</button>
                  <button className="dropdown-item">⭐ My Reviews</button>
                  <button className="dropdown-item">❤️ Saved Services</button>
                  <button className="dropdown-item">🔐 Change Password</button>
                  <button className="dropdown-item">⚙️ Account Settings</button>
                </div>

                <div className="profile-dropdown-divider"></div>

                <button
                  className="dropdown-item logout-item"
                  onClick={handleLogoutClick}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
