const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema(
  {
    // Campaign basic info
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Campaign name is required'],
      trim: true,
      minlength: [2, 'Campaign name must be at least 2 characters'],
      maxlength: [200, 'Campaign name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Campaign description cannot exceed 2000 characters'],
    },

    // Campaign type and channel
    type: {
      type: String,
      enum: ['email', 'sms', 'social', 'call', 'mixed'],
      default: 'email',
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'running', 'paused', 'completed', 'cancelled'],
      default: 'draft',
      index: true,
    },

    // Campaign scheduling
    scheduledDate: {
      type: Date,
      validate: {
        validator: function (value) {
          if (!value) return true; // Optional field
          return value > new Date();
        },
        message: 'Scheduled date must be in the future',
      },
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },

    // Campaign content
    subject: {
      type: String,
      trim: true,
      maxlength: [500, 'Subject cannot exceed 500 characters'],
    },
    content: {
      type: String,
      trim: true,
      maxlength: [10000, 'Content cannot exceed 10000 characters'],
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
    },

    // Campaign targeting
    targetContacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
      },
    ],
    targetSegment: {
      type: String,
      enum: ['all', 'lead', 'prospect', 'customer', 'custom'],
      default: 'custom',
    },
    targetCriteria: {
      status: [String],
      tags: [String],
      companies: [String],
    },

    // Campaign metrics and tracking
    metrics: {
      totalSent: {
        type: Number,
        default: 0,
      },
      totalOpened: {
        type: Number,
        default: 0,
      },
      totalClicked: {
        type: Number,
        default: 0,
      },
      totalResponded: {
        type: Number,
        default: 0,
      },
      totalFailed: {
        type: Number,
        default: 0,
      },
      openRate: {
        type: Number,
        default: 0,
      },
      clickRate: {
        type: Number,
        default: 0,
      },
      responseRate: {
        type: Number,
        default: 0,
      },
    },

    // Additional settings
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    budget: {
      type: Number,
      min: [0, 'Budget cannot be negative'],
    },
    notes: {
      type: String,
      maxlength: [5000, 'Notes cannot exceed 5000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
CampaignSchema.index({ owner: 1, createdAt: -1 });
CampaignSchema.index({ owner: 1, status: 1 });
CampaignSchema.index({ owner: 1, type: 1 });

// Virtual for campaign duration
CampaignSchema.virtual('duration').get(function () {
  if (this.startDate && this.endDate) {
    return Math.ceil(
      (this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
  return null;
});

// Pre-save hook to calculate metrics
CampaignSchema.pre('save', function (next) {
  if (this.metrics.totalSent > 0) {
    this.metrics.openRate = parseFloat(
      ((this.metrics.totalOpened / this.metrics.totalSent) * 100).toFixed(2)
    );
    this.metrics.clickRate = parseFloat(
      ((this.metrics.totalClicked / this.metrics.totalSent) * 100).toFixed(2)
    );
    this.metrics.responseRate = parseFloat(
      ((this.metrics.totalResponded / this.metrics.totalSent) * 100).toFixed(2)
    );
  }
  next();
});

module.exports = mongoose.model('Campaign', CampaignSchema);
