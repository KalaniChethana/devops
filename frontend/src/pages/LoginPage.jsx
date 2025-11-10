// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css";

// export default function LoginPage() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       alert(`Welcome ${data.name}, Role: ${data.role}`);
//       if (data.role === "client") {
//         navigate("/client-dashboard");
//       } else {
//         navigate("/provider-dashboard");
//       }
//     } else {
//       alert(data.message || "Login failed!");
//     }
//   };

//   return (
//    <div className="login-page">
//   <div className="login-container">
//     <h2>Login</h2>
//     <form onSubmit={handleSubmit} className="login-form">
//       <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Login</button>
//     </form>
//   </div>
// </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert(`Welcome ${data.name}, Role: ${data.role}`);
      if (data.role === "client") {
        navigate("/client-dashboard");
      } else {
        navigate("/provider-dashboard");
      }
    } else {
      alert(data.message || "Login failed!");
    }
  };

  // ...existing code...
  const handleSignup = (role) => {
    navigate(`/signup?role=${role}`);
  };

  return (
   <div className="login-page">
  <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit} className="login-form">
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>

    {/* Signup option selection */}
    <div className="signup-selection" style={{ marginTop: 16, textAlign: "center" }}>
      <p>
        Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
      </p>
    </div>
  </div>
</div>
  );
}