/**
 * AI Controller
 * Handles AI-assisted content generation requests
 * Acts as a secure proxy to AI services
 */

const {
  isAIAvailable,
  generateEmailSuggestions,
  generateCampaignSummary,
  generateAnalyticsInsights,
  generateOutreachSuggestions,
} = require('../services/ai.service');

/**
 * Check AI availability
 * @route GET /api/ai/status
 */
const checkAIStatus = async (req, res) => {
  try {
    const available = isAIAvailable();

    return res.status(200).json({
      success: true,
      message: 'AI service status',
      data: {
        available,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking AI status',
      error: error.message,
    });
  }
};

/**
 * Generate email content suggestions
 * @route POST /api/ai/email-suggestions
 */
const generateEmail = async (req, res) => {
  try {
    const { campaignType, userPrompt, tone } = req.body;

    // Validate required fields
    if (!campaignType || !userPrompt) {
      return res.status(400).json({
        success: false,
        message: 'campaignType and userPrompt are required',
      });
    }

    // Validate prompt length (prevent abuse)
    if (userPrompt.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Prompt exceeds maximum length (1000 characters)',
      });
    }

    // Check AI availability
    if (!isAIAvailable()) {
      return res.status(503).json({
        success: false,
        message: 'AI service is not available',
      });
    }

    // Generate suggestions
    const result = await generateEmailSuggestions({
      campaignType: campaignType.trim(),
      userPrompt: userPrompt.trim(),
      tone: tone || 'professional',
    });

    return res.status(200).json({
      success: true,
      message: 'Email suggestions generated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Email generation error:', error.message);

    // Handle JSON parse errors
    if (error.message.includes('JSON')) {
      return res.status(500).json({
        success: false,
        message: 'AI service returned invalid response format',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error generating email suggestions',
      error: error.message,
    });
  }
};

/**
 * Generate campaign summary
 * @route POST /api/ai/campaign-summary
 */
const generateSummary = async (req, res) => {
  try {
    const { campaignName, campaignContent, campaignType } = req.body;

    // Validate required fields
    if (!campaignName || !campaignContent) {
      return res.status(400).json({
        success: false,
        message: 'campaignName and campaignContent are required',
      });
    }

    // Validate content length
    if (campaignContent.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Campaign content exceeds maximum length (5000 characters)',
      });
    }

    // Check AI availability
    if (!isAIAvailable()) {
      return res.status(503).json({
        success: false,
        message: 'AI service is not available',
      });
    }

    // Generate summary
    const result = await generateCampaignSummary({
      campaignName: campaignName.trim(),
      campaignContent: campaignContent.trim(),
      campaignType: campaignType?.trim() || 'General',
    });

    return res.status(200).json({
      success: true,
      message: 'Campaign summary generated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Summary generation error:', error.message);

    if (error.message.includes('JSON')) {
      return res.status(500).json({
        success: false,
        message: 'AI service returned invalid response format',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error generating campaign summary',
      error: error.message,
    });
  }
};

/**
 * Generate analytics insights
 * @route POST /api/ai/analytics-insights
 */
const generateInsights = async (req, res) => {
  try {
    const { metrics, previousMetrics } = req.body;

    // Validate required fields
    if (!metrics || typeof metrics !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'metrics object is required',
      });
    }

    // Check AI availability
    if (!isAIAvailable()) {
      return res.status(503).json({
        success: false,
        message: 'AI service is not available',
      });
    }

    // Generate insights
    const result = await generateAnalyticsInsights({
      metrics,
      previousMetrics: previousMetrics || null,
    });

    return res.status(200).json({
      success: true,
      message: 'Analytics insights generated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Insights generation error:', error.message);

    if (error.message.includes('JSON')) {
      return res.status(500).json({
        success: false,
        message: 'AI service returned invalid response format',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error generating analytics insights',
      error: error.message,
    });
  }
};

/**
 * Generate outreach suggestions
 * @route POST /api/ai/outreach-suggestions
 */
const generateOutreach = async (req, res) => {
  try {
    const { contactName, contactCompany, contactRole, purpose } = req.body;

    // Validate required fields
    if (!contactName || !purpose) {
      return res.status(400).json({
        success: false,
        message: 'contactName and purpose are required',
      });
    }

    // Validate prompt length
    if (purpose.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Purpose exceeds maximum length (500 characters)',
      });
    }

    // Check AI availability
    if (!isAIAvailable()) {
      return res.status(503).json({
        success: false,
        message: 'AI service is not available',
      });
    }

    // Generate suggestions
    const result = await generateOutreachSuggestions({
      contactName: contactName.trim(),
      contactCompany: contactCompany?.trim() || null,
      contactRole: contactRole?.trim() || null,
      purpose: purpose.trim(),
    });

    return res.status(200).json({
      success: true,
      message: 'Outreach suggestions generated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Outreach generation error:', error.message);

    if (error.message.includes('JSON')) {
      return res.status(500).json({
        success: false,
        message: 'AI service returned invalid response format',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error generating outreach suggestions',
      error: error.message,
    });
  }
};

module.exports = {
  checkAIStatus,
  generateEmail,
  generateSummary,
  generateInsights,
  generateOutreach,
};
