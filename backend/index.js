const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const User = require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Welcome test route
app.get("/", (req, res) => {
  res.send("Neighborhood Service Finder API is running 🚀");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    initializeAdmin();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Initialize Admin User
async function initializeAdmin() {
  try {
    const adminEmail = "admin@gmail.com";
    const adminName = "admin";
    
    // Check if admin exists
    const existingAdmin = await User.findOne({
      $or: [
        { email: adminEmail },
        { name: { $regex: `^${adminName}$`, $options: "i" } }
      ]
    });

    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return;
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const newAdmin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    await newAdmin.save();
    console.log("✅ Admin user initialized successfully");
    console.log("📋 Admin Credentials:");
    console.log("   Email: admin@gmail.com");
    console.log("   Password: admin123");
  } catch (error) {
    console.error("❌ Admin initialization error:", error.message);
  }
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
