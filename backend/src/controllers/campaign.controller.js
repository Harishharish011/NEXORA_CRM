const Campaign = require('../models/Campaign.model');
const Contact = require('../models/Contact.model');
const mongoose = require('mongoose');

/**
 * Create a new campaign
 * @route POST /api/campaigns
 */
const createCampaign = async (req, res) => {
  try {
    const { name, description, type, subject, content, template, scheduledDate, tags } = req.body;

    // Validate required fields
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Campaign name is required',
      });
    }

    // Create campaign with user as owner
    const campaign = new Campaign({
      owner: req.user.id,
      name: name.trim(),
      description: description?.trim() || '',
      type: type || 'email',
      subject: subject?.trim() || '',
      content: content?.trim() || '',
      template: template || null,
      scheduledDate: scheduledDate || null,
      tags: tags?.map((tag) => tag.trim()).filter(Boolean) || [],
      status: 'draft',
    });

    // Save campaign
    await campaign.save();

    return res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: campaign,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error creating campaign',
      error: error.message,
    });
  }
};

/**
 * Get all campaigns for authenticated user
 * @route GET /api/campaigns
 */
const getAllCampaigns = async (req, res) => {
  try {
    const { status, type, sortBy } = req.query;

    // Build filter object
    const filter = { owner: req.user.id };

    if (status) {
      filter.status = status;
    }
    if (type) {
      filter.type = type;
    }

    // Determine sort order
    const sort = sortBy === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

    // Fetch campaigns with filtering and sorting
    const campaigns = await Campaign.find(filter)
      .select('-targetContacts')
      .sort(sort)
      .populate('template', 'name');

    return res.status(200).json({
      success: true,
      message: 'Campaigns retrieved successfully',
      count: campaigns.length,
      data: campaigns,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching campaigns',
      error: error.message,
    });
  }
};

/**
 * Get single campaign by ID
 * @route GET /api/campaigns/:id
 */
const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid campaign ID format',
      });
    }

    // Find campaign
    const campaign = await Campaign.findById(id).populate('template', 'name');

    // Check if campaign exists
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    // Check ownership
    if (campaign.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this campaign',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Campaign retrieved successfully',
      data: campaign,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching campaign',
      error: error.message,
    });
  }
};

/**
 * Update campaign
 * @route PUT /api/campaigns/:id
 */
const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid campaign ID format',
      });
    }

    // Find campaign
    const campaign = await Campaign.findById(id);

    // Check if campaign exists
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    // Check ownership
    if (campaign.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this campaign',
      });
    }

    // Prevent modification of certain fields
    const allowedUpdates = [
      'name',
      'description',
      'type',
      'subject',
      'content',
      'template',
      'scheduledDate',
      'status',
      'tags',
      'budget',
      'notes',
      'targetSegment',
      'targetCriteria',
    ];

    // Apply updates
    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        if (key === 'name' || key === 'description' || key === 'subject' || key === 'content' || key === 'notes') {
          campaign[key] = updates[key].trim();
        } else if (key === 'tags') {
          campaign[key] = updates[key].map((tag) => tag.trim()).filter(Boolean);
        } else {
          campaign[key] = updates[key];
        }
      }
    });

    // Save updated campaign
    await campaign.save();

    return res.status(200).json({
      success: true,
      message: 'Campaign updated successfully',
      data: campaign,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors)
        .map((e) => e.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error updating campaign',
      error: error.message,
    });
  }
};

/**
 * Delete campaign
 * @route DELETE /api/campaigns/:id
 */
const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid campaign ID format',
      });
    }

    // Find and delete campaign
    const campaign = await Campaign.findById(id);

    // Check if campaign exists
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    // Check ownership
    if (campaign.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this campaign',
      });
    }

    // Prevent deletion of running campaigns
    if (campaign.status === 'running') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete a running campaign. Pause it first.',
      });
    }

    await Campaign.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully',
      data: { id },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting campaign',
      error: error.message,
    });
  }
};

/**
 * Add contacts to campaign
 * @route POST /api/campaigns/:id/add-contacts
 */
const addContacts = async (req, res) => {
  try {
    const { id } = req.params;
    const { contactIds } = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid campaign ID format',
      });
    }

    // Validate contactIds
    if (!Array.isArray(contactIds) || contactIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of contact IDs',
      });
    }

    // Find campaign
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    // Check ownership
    if (campaign.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to modify this campaign',
      });
    }

    // Verify all contacts exist and belong to user
    const contacts = await Contact.find({
      _id: { $in: contactIds },
      owner: req.user.id,
    });

    if (contacts.length !== contactIds.length) {
      return res.status(400).json({
        success: false,
        message: 'Some contacts not found or do not belong to you',
      });
    }

    // Add new contacts (avoid duplicates)
    const uniqueContactIds = [...new Set([...campaign.targetContacts, ...contactIds])];
    campaign.targetContacts = uniqueContactIds;

    await campaign.save();

    return res.status(200).json({
      success: true,
      message: `Added ${contactIds.length} contact(s) to campaign`,
      data: {
        campaignId: id,
        totalContacts: campaign.targetContacts.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error adding contacts to campaign',
      error: error.message,
    });
  }
};

/**
 * Launch campaign
 * @route POST /api/campaigns/:id/launch
 */
const launchCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid campaign ID format',
      });
    }

    // Find campaign
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    // Check ownership
    if (campaign.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to launch this campaign',
      });
    }

    // Validate campaign state
    if (campaign.status === 'running' || campaign.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: `Cannot launch campaign with status: ${campaign.status}`,
      });
    }

    if (campaign.targetContacts.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot launch campaign without target contacts',
      });
    }

    // Launch campaign
    campaign.status = 'running';
    campaign.startDate = new Date();
    campaign.metrics.totalSent = campaign.targetContacts.length;

    await campaign.save();

    return res.status(200).json({
      success: true,
      message: 'Campaign launched successfully',
      data: {
        campaignId: id,
        status: campaign.status,
        startDate: campaign.startDate,
        totalSent: campaign.metrics.totalSent,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error launching campaign',
      error: error.message,
    });
  }
};

/**
 * Pause campaign
 * @route POST /api/campaigns/:id/pause
 */
const pauseCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid campaign ID format',
      });
    }

    // Find campaign
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    // Check ownership
    if (campaign.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to pause this campaign',
      });
    }

    // Check if campaign is running
    if (campaign.status !== 'running') {
      return res.status(400).json({
        success: false,
        message: 'Only running campaigns can be paused',
      });
    }

    // Pause campaign
    campaign.status = 'paused';

    await campaign.save();

    return res.status(200).json({
      success: true,
      message: 'Campaign paused successfully',
      data: {
        campaignId: id,
        status: campaign.status,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error pausing campaign',
      error: error.message,
    });
  }
};

/**
 * Get campaign metrics
 * @route GET /api/campaigns/:id/metrics
 */
const getCampaignMetrics = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid campaign ID format',
      });
    }

    // Find campaign
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    // Check ownership
    if (campaign.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this campaign metrics',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Campaign metrics retrieved successfully',
      data: {
        campaignId: id,
        campaignName: campaign.name,
        status: campaign.status,
        metrics: campaign.metrics,
        duration: campaign.duration,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching campaign metrics',
      error: error.message,
    });
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  addContacts,
  launchCampaign,
  pauseCampaign,
  getCampaignMetrics,
};
