import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProviderDashboard.css";

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [earnings, setEarnings] = useState({});
  const [showProfileMenu, setShowProfileMenu] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || (role !== "provider" && role !== "admin")) {
      navigate("/login");
      return;
    }

    setUserData({
      name: localStorage.getItem("userName") || "Provider",
      email: localStorage.getItem("userEmail") || "provider@example.com",
      role: role,
      id: localStorage.getItem("userId"),
    });

    fetchProviderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchProviderData = async () => {
   
    try {
      // Mock data - replace with actual API calls
      const mockBookings = [
        { id: 1, service: "Plumbing", client: "John Smith", date: "2025-01-20", time: "10:00 AM", status: "pending", amount: 150 },
        { id: 2, service: "Plumbing", client: "Sarah Johnson", date: "2025-01-22", time: "02:00 PM", status: "completed", amount: 150 },
        { id: 3, service: "Plumbing", client: "Mike Brown", date: "2025-01-25", time: "09:00 AM", status: "confirmed", amount: 150 },
      ];

      const mockServices = [
        { id: 1, name: "Plumbing", category: "Home Repair", hourlyRate: 75, status: "active", bookings: 25, rating: 4.8 },
        { id: 2, name: "Pipe Repair", category: "Home Repair", hourlyRate: 60, status: "active", bookings: 18, rating: 4.7 },
      ];

      const mockEarnings = {
        thisMonth: 4500,
        thisWeek: 950,
        total: 28750,
        pending: 750,
      };

      setBookings(mockBookings);
      setServices(mockServices);
      setEarnings(mockEarnings);
    } catch (err) {
      console.error("Error fetching provider data:", err);
    } 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleStatusChange = (id, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const totalEarnings = earnings.thisMonth || 0;

  return (
    <div className="provider-dashboard">
      {/* Header */}
      <header className="provider-header">
        <div className="provider-header-inner">
          <h1>🔧 Provider Dashboard</h1>

          <div className="provider-header-right">
            <button className="header-icon-btn">🔔</button>

            <div className="profile-menu-wrapper">
              <button
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                👤 {userData?.name || "Provider"}
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="profile-avatar">🔧</div>
                    <div className="profile-info">
                      <p className="profile-name">{userData?.name || "Provider Name"}</p>
                      <p className="profile-email">{userData?.email || "provider@example.com"}</p>
                      <p className="profile-role">Role: <strong>{userData?.role || "provider"}</strong></p>
                    </div>
                  </div>

                  <div className="profile-dropdown-divider"></div>

                  <div className="profile-dropdown-menu">
                    <button className="dropdown-item">📊 Earnings</button>
                    <button className="dropdown-item">⭐ My Reviews</button>
                    <button className="dropdown-item">📋 My Services</button>
                    <button className="dropdown-item">🔐 Change Password</button>
                    <button className="dropdown-item">⚙️ Account Settings</button>
                  </div>

                  <div className="profile-dropdown-divider"></div>

                  <button
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="provider-container">
        {/* Sidebar */}
        <aside className="provider-sidebar">
          <nav className="sidebar-nav">
            <button
              type="button"
              className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              📊 Overview
            </button>
            <button
              type="button"
              className={`nav-item ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => setActiveTab("bookings")}
            >
              📅 Bookings ({bookings.length})
            </button>
            <button
              type="button"
              className={`nav-item ${activeTab === "services" ? "active" : ""}`}
              onClick={() => setActiveTab("services")}
            >
              🔧 My Services ({services.length})
            </button>
            <button
              type="button"
              className={`nav-item ${activeTab === "earnings" ? "active" : ""}`}
              onClick={() => setActiveTab("earnings")}
            >
              💰 Earnings
            </button>
            <button
              type="button"
              className={`nav-item ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              ⭐ Reviews
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="provider-main">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="tab-content">
              <h2>Dashboard Overview</h2>

              <section className="stats-section">
                <div className="stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-info">
                    <p className="stat-label">Pending Bookings</p>
                    <p className="stat-number">{pendingBookings}</p>
                    <p className="stat-change">Need attention</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-info">
                    <p className="stat-label">This Month Earnings</p>
                    <p className="stat-number">${totalEarnings}</p>
                    <p className="stat-change">+15% from last month</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <p className="stat-label">Avg Rating</p>
                    <p className="stat-number">4.8</p>
                    <p className="stat-change">From 25 reviews</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🔧</div>
                  <div className="stat-info">
                    <p className="stat-label">Active Services</p>
                    <p className="stat-number">{services.filter(s => s.status === "active").length}</p>
                    <p className="stat-change">Ready to book</p>
                  </div>
                </div>
              </section>

              <section className="recent-section">
                <h3>Recent Bookings</h3>
                <div className="recent-list">
                  {bookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="recent-item">
                      <div className="recent-info">
                        <p className="recent-service">{booking.service}</p>
                        <p className="recent-client">Client: {booking.client}</p>
                        <p className="recent-datetime">{booking.date} at {booking.time}</p>
                      </div>
                      <div className="recent-right">
                        <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                        <p className="recent-amount">${booking.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="tab-content">
              <h2>My Bookings</h2>

              <div className="bookings-filters">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Pending</button>
                <button className="filter-btn">Confirmed</button>
                <button className="filter-btn">Completed</button>
              </div>

              <div className="bookings-list">
                {bookings.map(booking => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-left">
                      <h4>{booking.service}</h4>
                      <p className="booking-client">👤 {booking.client}</p>
                      <p className="booking-datetime">📅 {booking.date} at {booking.time}</p>
                    </div>

                    <div className="booking-middle">
                      <span className={`status-badge ${booking.status}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="booking-right">
                      <p className="booking-amount">${booking.amount}</p>
                      <div className="booking-actions">
                        {booking.status === "pending" && (
                          <>
                            <button
                              className="btn-small confirm"
                              onClick={() => handleStatusChange(booking.id, "confirmed")}
                            >
                              Confirm
                            </button>
                            <button
                              className="btn-small reject"
                              onClick={() => handleStatusChange(booking.id, "rejected")}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {booking.status === "confirmed" && (
                          <button
                            className="btn-small complete"
                            onClick={() => handleStatusChange(booking.id, "completed")}
                          >
                            Mark Done
                          </button>
                        )}
                        <button className="btn-small view">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === "services" && (
            <div className="tab-content">
              <div className="services-header-row">
                <h2>My Services</h2>
                <button className="btn-add-service">+ Add New Service</button>
              </div>

              <div className="services-grid">
                {services.map(service => (
                  <div key={service.id} className="service-card-provider">
                    <div className="service-header">
                      <h3>{service.name}</h3>
                      <span className={`status-badge ${service.status}`}>
                        {service.status}
                      </span>
                    </div>

                    <p className="service-category">{service.category}</p>

                    <div className="service-details">
                      <div className="detail">
                        <span className="label">Hourly Rate:</span>
                        <span className="value">${service.hourlyRate}/hr</span>
                      </div>
                      <div className="detail">
                        <span className="label">Bookings:</span>
                        <span className="value">{service.bookings}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Rating:</span>
                        <span className="value">⭐ {service.rating}</span>
                      </div>
                    </div>

                    <div className="service-card-actions">
                      <button className="btn-small edit">Edit</button>
                      <button className="btn-small delete" onClick={() => handleDeleteService(service.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === "earnings" && (
            <div className="tab-content">
              <h2>Earnings & Payouts</h2>

              <section className="earnings-overview">
                <div className="earnings-card">
                  <p className="earnings-label">Total Earnings</p>
                  <p className="earnings-amount">${earnings.total || 0}</p>
                  <p className="earnings-period">All time</p>
                </div>

                <div className="earnings-card">
                  <p className="earnings-label">This Month</p>
                  <p className="earnings-amount">${earnings.thisMonth || 0}</p>
                  <p className="earnings-period">Jan 2025</p>
                </div>

                <div className="earnings-card">
                  <p className="earnings-label">This Week</p>
                  <p className="earnings-amount">${earnings.thisWeek || 0}</p>
                  <p className="earnings-period">Last 7 days</p>
                </div>

                <div className="earnings-card">
                  <p className="earnings-label">Pending Payout</p>
                  <p className="earnings-amount" style={{ color: "#ed8936" }}>
                    ${earnings.pending || 0}
                  </p>
                  <p className="earnings-period">Awaiting transfer</p>
                </div>
              </section>

              <section className="payout-section">
                <h3>Payout Details</h3>
                <div className="payout-form">
                  <div className="form-group">
                    <label>Bank Account</label>
                    <input type="text" placeholder="xxxx xxxx xxxx 1234" disabled />
                  </div>

                  <div className="form-group">
                    <label>Account Holder</label>
                    <input type="text" placeholder={userData?.name || "Your Name"} disabled />
                  </div>

                  <div className="form-group">
                    <label>Routing Number</label>
                    <input type="text" placeholder="123456789" />
                  </div>

                  <button className="btn-payout">Request Payout</button>
                </div>
              </section>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="tab-content">
              <h2>Customer Reviews</h2>

              <div className="reviews-summary">
                <div className="rating-overview">
                  <p className="rating-number">4.8</p>
                  <p className="rating-stars">⭐⭐⭐⭐⭐</p>
                  <p className="rating-count">Based on 25 reviews</p>
                </div>

                <div className="rating-breakdown">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="rating-bar">
                      <span className="bar-label">{stars}★</span>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                      <span className="bar-count">{Math.floor(Math.random() * 20)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reviews-list">
                {[1, 2, 3].map(i => (
                  <div key={i} className="review-item">
                    <div className="review-header">
                      <p className="review-author">Customer {i}</p>
                      <span className="review-rating">⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className="review-service">Service: Plumbing</p>
                    <p className="review-text">
                      Great service! Very professional and completed the job on time. Would recommend.
                    </p>
                    <p className="review-date">2 days ago</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}