import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./ClientDashboard.css";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || (role !== "client" && role !== "admin")) {
      navigate("/login");
      return;
    }

    setUserData({
      name: localStorage.getItem("userName") || "Client",
      email: localStorage.getItem("userEmail") || "user@example.com",
      role: role,
      id: localStorage.getItem("userId"),
    });

    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  async function fetchServices() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/services", {
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Service API unavailable");
      }
      const data = await res.json();
      setServices(Array.isArray(data) ? data : data.services || []);
    } catch {
      setServices([
        {
          id: 1,
          name: "Plumbing",
          category: "Home Repair",
          price: 50,
          rating: 4.8,
          providers: 45,
          description: "Fix leaks, replace pipes.",
        },
        {
          id: 2,
          name: "Electrical",
          category: "Home Repair",
          price: 60,
          rating: 4.7,
          providers: 38,
          description: "Install lights, troubleshoot wiring.",
        },
        {
          id: 3,
          name: "Cleaning",
          category: "Cleaning",
          price: 30,
          rating: 4.9,
          providers: 52,
          description: "Home & office cleaning.",
        },
        {
          id: 4,
          name: "Painting",
          category: "Renovation",
          price: 120,
          rating: 4.6,
          providers: 28,
          description: "Interior & exterior painting.",
        },
        {
          id: 5,
          name: "Landscaping",
          category: "Outdoor",
          price: 80,
          rating: 4.5,
          providers: 35,
          description: "Garden design & maintenance.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleBook = (service) => {
    navigate(`/services/${service.id}`);
  };

  return (
    <div className="client-dashboard">
      <Navbar
        onSearch={setSearch}
        searchValue={search}
        userData={userData}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
        handleLogout={handleLogout}
      />

      <main className="client-main">
        <div className="services-header">
          <h2>Available Services</h2>
          <p className="services-subtext">
            Choose from {filtered.length} services in your area
          </p>
        </div>

        {loading ? (
          <p className="center">Loading services...</p>
        ) : filtered.length === 0 ? (
          <p className="center">No services found.</p>
        ) : (
          <div className="services-grid">
            {filtered.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-card-badge">
                  ⭐ {service.rating ?? "—"}
                </div>

                <div className="service-card-header">
                  <h3>{service.name}</h3>
                  <span className="service-category">
                    {service.category || "General"}
                  </span>
                </div>

                <p className="service-desc">
                  {service.description || "No description provided."}
                </p>

                <div className="service-meta">
                  <div className="meta-item">
                    <span className="meta-label">Providers</span>
                    <span className="meta-value">{service.providers ?? 0}</span>
                  </div>
                  <div className="meta-item price">
                    <span className="meta-label">From</span>
                    <span className="meta-value">
                      ${service.price ?? "—"}
                    </span>
                  </div>
                </div>

                <div className="service-actions">
                  <button
                    className="btn-primary"
                    onClick={() => handleBook(service)}
                  >
                    Book Now
                  </button>
                  <button
                    className="btn-ghost"
                    onClick={() => alert("Saved to favorites")}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}