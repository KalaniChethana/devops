// ...existing code...
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  console.log("AdminDashboard mounted");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      setUserData({
        name: localStorage.getItem("userName") || "Administrator",
        email: localStorage.getItem("userEmail") || "admin@neighborhoodservices.com",
      });

      // Load initial data
      fetchUsers();
      fetchServices();
      fetchReports();
    } catch (err) {
      console.error("AdminDashboard useEffect error:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const mockUsers = [
        { id: 1, name: "John Smith", email: "john@example.com", role: "client", status: "active", joinDate: "2025-01-15" },
        { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "provider", status: "active", joinDate: "2025-01-10" },
        { id: 3, name: "Mike Brown", email: "mike@example.com", role: "client", status: "inactive", joinDate: "2024-12-20" },
      ];
      setUsers(mockUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const mockServices = [
        { id: 1, name: "Plumbing", category: "Home Repair", providers: 45, status: "active", rating: 4.8 },
        { id: 2, name: "Electrical", category: "Home Repair", providers: 38, status: "active", rating: 4.7 },
      ];
      setServices(mockServices);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const fetchReports = async () => {
    try {
      const mockReports = [
        { id: 1, type: "User Growth", value: "+25%", period: "Last Month", trend: "up" },
        { id: 2, type: "Service Requests", value: "+150", period: "Last Month", trend: "up" },
      ];
      setReports(mockReports);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: newStatus } : user
    ));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <h1>🏘️ Admin Dashboard</h1>
          <div className="header-actions">
            <span className="welcome-text">Welcome, {userData?.name || "Admin"}</span>
            <span style={{marginRight:12, opacity:0.9, fontSize:13}}>Tab: {activeTab}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="admin-container">
        <aside className="admin-sidebar">
          <nav className="sidebar-nav">
            <button type="button" className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>📊 Dashboard</button>
            <button type="button" className={`nav-item ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>👥 Users ({users.length})</button>
            <button type="button" className={`nav-item ${activeTab === "services" ? "active" : ""}`} onClick={() => setActiveTab("services")}>🔧 Services ({services.length})</button>
            <button type="button" className={`nav-item ${activeTab === "reports" ? "active" : ""}`} onClick={() => setActiveTab("reports")}>📈 Reports</button>
            <button type="button" className={`nav-item ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>⚙️ Settings</button>
          </nav>
        </aside>

        <main className="admin-main">
          {activeTab === "dashboard" && (
            <div className="tab-content">
              <h2>Dashboard Overview</h2>
              <section className="stats-section">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <p className="stat-label">Total Users</p>
                    <p className="stat-number">{users.length}</p>
                    <p className="stat-change">+12% from last month</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🔧</div>
                  <div className="stat-info">
                    <p className="stat-label">Active Services</p>
                    <p className="stat-number">{services.filter(s => s.status === "active").length}</p>
                    <p className="stat-change">+5 new this month</p>
                  </div>
                </div>
              </section>

              <section className="reports-section">
                <h3>Key Reports</h3>
                <div className="reports-grid">
                  {reports.map(report => (
                    <div key={report.id} className="report-card">
                      <div className="report-header">
                        <h4>{report.type}</h4>
                        <span className={`trend ${report.trend}`}>{report.trend === "up" ? "📈" : "📊"}</span>
                      </div>
                      <p className="report-value">{report.value}</p>
                      <p className="report-period">{report.period}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "users" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>User Management</h2>
                <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
              </div>

              {loading ? <p>Loading users...</p> : (
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Join Date</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr key={user.id}>
                          <td><strong>{user.name}</strong></td>
                          <td>{user.email}</td>
                          <td><span className={`badge ${user.role}`}>{user.role}</span></td>
                          <td>
                            <select value={user.status} onChange={(e) => handleStatusChange(user.id, e.target.value)} className="status-select">
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="suspended">Suspended</option>
                            </select>
                          </td>
                          <td>{user.joinDate}</td>
                          <td>
                            <button className="action-btn view">View</button>
                            <button className="action-btn delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "services" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>Services Management</h2>
                <input type="text" placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
              </div>

              <div className="services-grid">
                {filteredServices.map(service => (
                  <div key={service.id} className="service-card-admin">
                    <div className="service-header">
                      <h3>{service.name}</h3>
                      <span className={`status-badge ${service.status}`}>{service.status}</span>
                    </div>
                    <p className="service-category">{service.category}</p>
                    <div className="service-stats">
                      <div className="stat"><span className="label">Providers:</span><span className="value">{service.providers}</span></div>
                      <div className="stat"><span className="label">Rating:</span><span className="value">⭐ {service.rating}</span></div>
                    </div>
                    <div className="service-actions">
                      <button className="btn-small edit">Edit</button>
                      <button className="btn-small delete" onClick={() => handleDeleteService(service.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="tab-content">
              <h2>System Reports & Analytics</h2>
              <div className="reports-detailed">
                <div className="report-section">
                  <h3>📊 User Statistics</h3>
                  <div className="report-box">
                    <p>Total Users: <strong>{users.length}</strong></p>
                    <p>Clients: <strong>{users.filter(u => u.role === "client").length}</strong></p>
                    <p>Providers: <strong>{users.filter(u => u.role === "provider").length}</strong></p>
                    <p>Active Users: <strong>{users.filter(u => u.status === "active").length}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="tab-content">
              <h2>System Settings</h2>
              <div className="settings-form">
                <div className="settings-section">
                  <h3>General Settings</h3>
                  <div className="form-group"><label>Platform Name</label><input type="text" defaultValue="Neighborhood Service Finder" /></div>
                  <div className="form-group"><label>Support Email</label><input type="email" defaultValue="support@example.com" /></div>
                  <div className="form-group"><label>Support Phone</label><input type="tel" defaultValue="+1 (555) 000-0000" /></div>
                </div>

                <div className="settings-section">
                  <h3>Business Settings</h3>
                  <div className="form-group"><label>Commission Rate (%)</label><input type="number" defaultValue="15" min="0" max="100" /></div>
                  <div className="form-group"><label>Min Service Fee ($)</label><input type="number" defaultValue="5" min="0" /></div>
                  <div className="form-group"><label>Enable New Registrations</label><input type="checkbox" defaultChecked /></div>
                </div>

                <button className="save-btn">Save Settings</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
// ...existing code...