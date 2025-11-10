import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "client" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert("Signup failed!");
    }
  };

  return (
    <div className="signup-page">
  <div className="signup-container">
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit} className="signup-form">
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange}>
        <option value="client">Client</option>
        <option value="service-provider">Service Provider</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</div>
  );
}
