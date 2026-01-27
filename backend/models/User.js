const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["client", "provider", "admin"], 
    required: true,
    default: "client"
  },
  // Provider fields (optional for clients)
  phoneNumber: { 
    type: String, 
    default: null,
    sparse: true
  },
  address: { 
    type: String, 
    default: null,
    sparse: true
  },
  // Additional fields
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  profileImage: { 
    type: String, 
    default: null 
  },
  rating: { 
    type: Number, 
    default: 5.0,
    min: 0,
    max: 5
  },
  totalReviews: { 
    type: Number, 
    default: 0 
  },
  totalEarnings: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);