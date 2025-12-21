const express = require('express');
const router = express.Router();
const {
  checkAIStatus,
  generateEmail,
  generateSummary,
  generateInsights,
  generateOutreach,
} = require('../controllers/ai.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * All AI routes are protected with JWT authentication
 * This prevents unauthorized API calls and usage tracking
 */
router.use(authMiddleware);

/**
 * Check AI service availability
 * Useful for frontend to determine if AI features are enabled
 */
router.get('/status', checkAIStatus);

/**
 * Generate email content suggestions
 * For use in Email Builder and Campaign creation
 * Generates subject line, body, and CTA suggestions
 */
router.post('/email-suggestions', generateEmail);

/**
 * Generate campaign summary
 * For use in Campaign details view
 * Summarizes campaign intent and key messages
 */
router.post('/campaign-summary', generateSummary);

/**
 * Generate analytics insights
 * For use in Analytics and Dashboard
 * Converts numbers into readable insights
 */
router.post('/analytics-insights', generateInsights);

/**
 * Generate outreach suggestions
 * For use in Contacts and Email Builder
 * Personalized message suggestions
 */
router.post('/outreach-suggestions', generateOutreach);

module.exports = router;
