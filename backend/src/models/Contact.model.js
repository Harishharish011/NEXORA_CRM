/**
 * Contact Model
 * Defines the Contact schema for MongoDB using Mongoose
 * Each contact belongs to a user and can only be accessed by that user
 */

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    // Owner reference - links contact to a user
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Contact must belong to a user'],
    },

    // Basic information
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
      default: '',
    },

    // Contact methods
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },

    phone: {
      type: String,
      trim: true,
    },

    // Company information
    company: {
      type: String,
      trim: true,
    },

    jobTitle: {
      type: String,
      trim: true,
    },

    // Contact status
    status: {
      type: String,
      enum: {
        values: ['Lead', 'Prospect', 'Customer'],
        message: 'Status must be Lead, Prospect, or Customer',
      },
      default: 'Lead',
    },

    // Categorization
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
contactSchema.index({ owner: 1 }); // Find all contacts for a user
contactSchema.index({ owner: 1, createdAt: -1 }); // Sort by date for a user
contactSchema.index({ email: 1, owner: 1 }); // Find contact by email for a user

// Prevent re-compilation of model if it already exists
module.exports = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
