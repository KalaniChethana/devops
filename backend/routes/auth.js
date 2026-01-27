const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, phoneNumber, address } = req.body;

    console.log("🔔 Signup request:", { name, email, role, phoneNumber, address });

    // ===== VALIDATION =====
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    if (!role) {
      return res.status(400).json({ error: "Role (client/provider) is required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Normalize role
    const normalizedRole = role === "service-provider" ? "provider" : role;

    // Validate provider-specific fields
    if (normalizedRole === "provider") {
      if (!phoneNumber || phoneNumber.trim() === "") {
        return res.status(400).json({ error: "Phone number is required for service providers" });
      }
      if (!address || address.trim() === "") {
        return res.status(400).json({ error: "Address is required for service providers" });
      }
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // ===== CREATE USER =====
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: normalizedRole,
    };

    // Add provider fields only if provider
    if (normalizedRole === "provider") {
      userData.phoneNumber = phoneNumber.trim();
      userData.address = address.trim();
    }

    const newUser = new User(userData);
    await newUser.save();

    console.log("✅ User created:", { id: newUser._id, email: newUser.email, role: newUser.role });

    // ===== CREATE JWT TOKEN =====
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
      },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    // ===== SEND RESPONSE =====
    res.status(201).json({
      message: "Account created successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });

  } catch (error) {
    console.error("❌ Signup error:", error.message);
    res.status(500).json({ 
      error: error.message || "Server error during signup",
      details: process.env.NODE_ENV === "development" ? error.stack : null
    });
  }
});

// Login Route
// ...existing code...
router.post("/login", async (req, res) => {
  try {
    // allow either email or username in the same field
    const identifier = (req.body.email || req.body.identifier || "").trim();
    const password = req.body.password;

    if (!identifier || !password) {
      return res.status(400).json({ error: "Email/username and password are required" });
    }

    // helper to escape regex for username search
    const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // if identifier looks like an email, match by email; otherwise try email OR name (case-insensitive)
    const query = identifier.includes("@")
      ? { email: identifier.toLowerCase() }
      : {
          $or: [
            { email: identifier.toLowerCase() },
            { name: { $regex: `^${escapeRegex(identifier)}$`, $options: "i" } }
          ]
        };

    const user = await User.findOne(query);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error during login" });
  }
});
// ...existing code...

// Create Admin
router.post("/create-admin", async (req, res) => {
  try {
    const adminEmail = "admin@neighborhoodservices.com";
    const adminPassword = "POST http://localhost:YOUR_PORT/api/auth/create-admin";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      return res.status(200).json({ 
        message: "Admin already exists",
        credentials: { email: adminEmail, password: adminPassword }
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const admin = new User({
      name: "Administrator",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    await admin.save();

    console.log("✅ Admin created");

    res.status(201).json({
      message: "Admin created successfully",
      credentials: {
        email: adminEmail,
        password: adminPassword,
      },
    });

  } catch (error) {
    console.error("❌ Admin creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;