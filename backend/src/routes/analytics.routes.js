const express = require('express');
const router = express.Router();
const {
  getDashboardSummary,
  getCampaignStatusBreakdown,
  getCampaignTypeDistribution,
  getRecentActivity,
  getContactStatistics,
  getCampaignPerformance,
  getMonthlyActivity,
  getTopCampaigns,
  getAnalyticsOverview,
} = require('../controllers/analytics.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// All analytics routes are protected with JWT authentication
router.use(authMiddleware);

/**
 * Primary endpoints
 */
router.get('/summary', getDashboardSummary);
router.get('/campaign-status', getCampaignStatusBreakdown);
router.get('/recent-activity', getRecentActivity);

/**
 * Secondary endpoints (additional analytics)
 */
router.get('/campaign-types', getCampaignTypeDistribution);
router.get('/contact-statistics', getContactStatistics);
router.get('/campaign-performance', getCampaignPerformance);
router.get('/monthly-activity', getMonthlyActivity);
router.get('/top-campaigns', getTopCampaigns);

/**
 * Comprehensive overview (all metrics at once)
 */
router.get('/overview', getAnalyticsOverview);

module.exports = router;
