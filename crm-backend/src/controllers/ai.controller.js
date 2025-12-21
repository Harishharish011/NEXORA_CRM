/**
 * AI Controller
 * Handles AI-related API requests
 */

const aiService = require('../services/ai.service');

class AIController {
  /**
   * Generate email suggestions
   * POST /api/ai/email-suggestions
   */
  async generateEmailSuggestions(req, res) {
    try {
      const userId = req.user?.id;
      const {
        recipientName,
        recipientCompany,
        emailType,
        campaignContext,
        tone,
      } = req.body;

      // Validate required fields
      if (!recipientName || !campaignContext) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: recipientName, campaignContext',
        });
      }

      // Generate suggestions
      const suggestions = await aiService.generateEmailSuggestions({
        recipientName,
        recipientCompany: recipientCompany || 'their company',
        emailType: emailType || 'follow-up',
        campaignContext,
        tone: tone || 'professional',
      });

      return res.json({
        success: true,
        data: {
          suggestions,
          metadata: {
            count: suggestions.length,
            type: 'email_suggestions',
            timestamp: new Date(),
          },
        },
      });
    } catch (error) {
      console.error('Error generating email suggestions:', error);

      return res.status(500).json({
        success: false,
        message: 'Failed to generate email suggestions',
        error: error.message,
      });
    }
  }

  /**
   * Generate campaign summary
   * POST /api/ai/campaign-summary
   */
  async generateCampaignSummary(req, res) {
    try {
      const userId = req.user?.id;
      const {
        campaignName,
        campaignDescription,
        targetAudience,
        campaignGoal,
      } = req.body;

      // Validate required fields
      if (!campaignName || !campaignDescription || !campaignGoal) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: campaignName, campaignDescription, campaignGoal',
        });
      }

      // Generate analysis
      const analysis = await aiService.generateCampaignSummary({
        campaignName,
        campaignDescription,
        targetAudience: targetAudience || [],
        campaignGoal,
      });

      return res.json({
        success: true,
        data: {
          ...analysis,
          metadata: {
            type: 'campaign_summary',
            timestamp: new Date(),
          },
        },
      });
    } catch (error) {
      console.error('Error generating campaign summary:', error);

      return res.status(500).json({
        success: false,
        message: 'Failed to generate campaign summary',
        error: error.message,
      });
    }
  }

  /**
   * Generate analytics insights
   * POST /api/ai/analytics-insights
   */
  async generateAnalyticsInsights(req, res) {
    try {
      const userId = req.user?.id;
      const { metrics, timeframe, campaignName } = req.body;

      // Validate required fields
      if (!metrics) {
        return res.status(400).json({
          success: false,
          message: 'Missing required field: metrics',
        });
      }

      // Generate insights
      const insights = await aiService.generateAnalyticsInsights({
        metrics,
        timeframe: timeframe || '30days',
        campaignName: campaignName || 'Campaign',
      });

      return res.json({
        success: true,
        data: {
          ...insights,
          metadata: {
            type: 'analytics_insights',
            timeframe: timeframe || '30days',
            timestamp: new Date(),
          },
        },
      });
    } catch (error) {
      console.error('Error generating analytics insights:', error);

      return res.status(500).json({
        success: false,
        message: 'Failed to generate analytics insights',
        error: error.message,
      });
    }
  }

  /**
   * Generate outreach suggestions
   * POST /api/ai/outreach-suggestions
   */
  async generateOutreachSuggestions(req, res) {
    try {
      const userId = req.user?.id;
      const {
        contactName,
        contactRole,
        companyName,
        industry,
        value,
        tone,
      } = req.body;

      // Validate required fields
      if (!contactName || !value) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: contactName, value',
        });
      }

      // Generate suggestions
      const suggestions = await aiService.generateOutreachSuggestions({
        contactName,
        contactRole: contactRole || 'Decision Maker',
        companyName: companyName || 'their company',
        industry: industry || 'their industry',
        value,
        tone: tone || 'professional',
      });

      return res.json({
        success: true,
        data: {
          suggestions,
          metadata: {
            count: suggestions.length,
            type: 'outreach_suggestions',
            timestamp: new Date(),
          },
        },
      });
    } catch (error) {
      console.error('Error generating outreach suggestions:', error);

      return res.status(500).json({
        success: false,
        message: 'Failed to generate outreach suggestions',
        error: error.message,
      });
    }
  }

  /**
   * Check AI service status
   * GET /api/ai/status
   */
  async checkStatus(req, res) {
    try {
      const status = await aiService.checkStatus();

      return res.json({
        success: true,
        data: status,
      });
    } catch (error) {
      console.error('Error checking AI status:', error);

      return res.status(500).json({
        success: false,
        message: 'Failed to check AI service status',
        error: error.message,
      });
    }
  }
}

module.exports = new AIController();
