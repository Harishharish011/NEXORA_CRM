/**
 * User Model
 * Defines the User schema for MongoDB using Mongoose
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Authentication fields
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't include password in queries by default
    },

    // Onboarding fields
    industry: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: null,
    },
    companyName: {
      type: String,
      default: null,
    },
    companyUrl: {
      type: String,
      default: null,
    },

    // Onboarding status
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster email lookups
userSchema.index({ email: 1 });

// Prevent re-compilation of model if it already exists
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
