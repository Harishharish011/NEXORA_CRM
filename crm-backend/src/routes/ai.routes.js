/**
 * AI Routes
 * Endpoints for AI-powered suggestions and analysis
 */

const router = require('express').Router();
const aiController = require('../controllers/ai.controller');
const { authenticate } = require('../middlewares/auth.middleware');

// Middleware: Check authentication
router.use(authenticate);

/**
 * POST /api/ai/email-suggestions
 * Generate email content suggestions
 */
router.post('/email-suggestions', async (req, res) => {
  try {
    await aiController.generateEmailSuggestions(req, res);
  } catch (error) {
    console.error('Error in email-suggestions route:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * POST /api/ai/campaign-summary
 * Generate campaign summary and analysis
 */
router.post('/campaign-summary', async (req, res) => {
  try {
    await aiController.generateCampaignSummary(req, res);
  } catch (error) {
    console.error('Error in campaign-summary route:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * POST /api/ai/analytics-insights
 * Generate analytics insights and recommendations
 */
router.post('/analytics-insights', async (req, res) => {
  try {
    await aiController.generateAnalyticsInsights(req, res);
  } catch (error) {
    console.error('Error in analytics-insights route:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * POST /api/ai/outreach-suggestions
 * Generate personalized outreach messages
 */
router.post('/outreach-suggestions', async (req, res) => {
  try {
    await aiController.generateOutreachSuggestions(req, res);
  } catch (error) {
    console.error('Error in outreach-suggestions route:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * GET /api/ai/status
 * Check AI service availability
 */
router.get('/status', async (req, res) => {
  try {
    await aiController.checkStatus(req, res);
  } catch (error) {
    console.error('Error in status route:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
