const Contact = require('../models/Contact.model');
const Campaign = require('../models/Campaign.model');
const User = require('../models/User.model');

/**
 * Get dashboard summary with key metrics
 * @route GET /api/analytics/summary
 */
const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all metrics in parallel for efficiency
    const [totalContacts, totalCampaigns, activeCampaigns, completedCampaigns, drafts, templatesCount] =
      await Promise.all([
        // Total contacts for this user
        Contact.countDocuments({ owner: userId }),
        // Total campaigns for this user
        Campaign.countDocuments({ owner: userId }),
        // Active campaigns (running or scheduled)
        Campaign.countDocuments({
          owner: userId,
          status: { $in: ['running', 'scheduled'] },
        }),
        // Completed campaigns
        Campaign.countDocuments({
          owner: userId,
          status: 'completed',
        }),
        // Draft campaigns
        Campaign.countDocuments({
          owner: userId,
          status: 'draft',
        }),
        // Templates count (assuming user has templates collection or use 0)
        Campaign.distinct('template', { owner: userId }).then((templates) => templates.length),
      ]);

    return res.status(200).json({
      success: true,
      message: 'Dashboard summary retrieved successfully',
      data: {
        totalContacts,
        totalCampaigns,
        activeCampaigns,
        completedCampaigns,
        draftCampaigns: drafts,
        templatesCount,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching dashboard summary',
      error: error.message,
    });
  }
};

/**
 * Get campaign status breakdown
 * @route GET /api/analytics/campaign-status
 */
const getCampaignStatusBreakdown = async (req, res) => {
  try {
    const userId = req.user.id;

    // Use aggregation pipeline for efficient grouping
    const statusBreakdown = await Campaign.aggregate([
      {
        $match: { owner: { $oid: userId } },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Transform to object format with all statuses
    const result = {
      draft: 0,
      scheduled: 0,
      running: 0,
      paused: 0,
      completed: 0,
      cancelled: 0,
    };

    statusBreakdown.forEach((item) => {
      result[item._id] = item.count;
    });

    return res.status(200).json({
      success: true,
      message: 'Campaign status breakdown retrieved successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching campaign status breakdown',
      error: error.message,
    });
  }
};

/**
 * Get campaign type distribution
 * @route GET /api/analytics/campaign-types
 */
const getCampaignTypeDistribution = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get campaign type distribution
    const typeDistribution = await Campaign.aggregate([
      {
        $match: { owner: { $oid: userId } },
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Transform to object format
    const result = {
      email: 0,
      sms: 0,
      social: 0,
      call: 0,
      mixed: 0,
    };

    typeDistribution.forEach((item) => {
      result[item._id] = item.count;
    });

    return res.status(200).json({
      success: true,
      message: 'Campaign type distribution retrieved successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching campaign type distribution',
      error: error.message,
    });
  }
};

/**
 * Get recent activity (latest contacts and campaigns created)
 * @route GET /api/analytics/recent-activity
 */
const getRecentActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 5 } = req.query;
    const limitNum = Math.min(parseInt(limit) || 5, 20); // Cap at 20

    // Fetch recent contacts and campaigns in parallel
    const [recentContacts, recentCampaigns] = await Promise.all([
      Contact.find({ owner: userId })
        .select('firstName lastName email status createdAt')
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .lean(),
      Campaign.find({ owner: userId })
        .select('name status type metrics.totalSent createdAt')
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      message: 'Recent activity retrieved successfully',
      data: {
        recentContacts: recentContacts.map((contact) => ({
          id: contact._id,
          type: 'contact',
          title: `${contact.firstName} ${contact.lastName || ''}`.trim(),
          description: contact.email,
          status: contact.status,
          timestamp: contact.createdAt,
        })),
        recentCampaigns: recentCampaigns.map((campaign) => ({
          id: campaign._id,
          type: 'campaign',
          title: campaign.name,
          description: `${campaign.type} campaign`,
          status: campaign.status,
          sent: campaign.metrics?.totalSent || 0,
          timestamp: campaign.createdAt,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching recent activity',
      error: error.message,
    });
  }
};

/**
 * Get contact statistics (status breakdown)
 * @route GET /api/analytics/contact-statistics
 */
const getContactStatistics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get contact status distribution
    const statusBreakdown = await Contact.aggregate([
      {
        $match: { owner: { $oid: userId } },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Transform to object format
    const result = {
      lead: 0,
      prospect: 0,
      customer: 0,
    };

    statusBreakdown.forEach((item) => {
      if (result.hasOwnProperty(item._id)) {
        result[item._id] = item.count;
      }
    });

    const totalContacts = Object.values(result).reduce((a, b) => a + b, 0);

    return res.status(200).json({
      success: true,
      message: 'Contact statistics retrieved successfully',
      data: {
        byStatus: result,
        total: totalContacts,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching contact statistics',
      error: error.message,
    });
  }
};

/**
 * Get campaign performance metrics
 * @route GET /api/analytics/campaign-performance
 */
const getCampaignPerformance = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get campaigns with metrics
    const campaigns = await Campaign.find({ owner: userId })
      .select('name type status metrics')
      .sort({ startDate: -1 })
      .lean();

    // Calculate aggregate metrics
    const aggregateMetrics = campaigns.reduce(
      (acc, campaign) => {
        acc.totalCampaigns += 1;
        acc.totalSent += campaign.metrics?.totalSent || 0;
        acc.totalOpened += campaign.metrics?.totalOpened || 0;
        acc.totalClicked += campaign.metrics?.totalClicked || 0;
        acc.totalResponded += campaign.metrics?.totalResponded || 0;
        acc.totalFailed += campaign.metrics?.totalFailed || 0;
        return acc;
      },
      {
        totalCampaigns: 0,
        totalSent: 0,
        totalOpened: 0,
        totalClicked: 0,
        totalResponded: 0,
        totalFailed: 0,
      }
    );

    // Calculate rates
    const avgOpenRate =
      aggregateMetrics.totalSent > 0
        ? parseFloat(((aggregateMetrics.totalOpened / aggregateMetrics.totalSent) * 100).toFixed(2))
        : 0;
    const avgClickRate =
      aggregateMetrics.totalSent > 0
        ? parseFloat(((aggregateMetrics.totalClicked / aggregateMetrics.totalSent) * 100).toFixed(2))
        : 0;
    const avgResponseRate =
      aggregateMetrics.totalSent > 0
        ? parseFloat(((aggregateMetrics.totalResponded / aggregateMetrics.totalSent) * 100).toFixed(2))
        : 0;

    return res.status(200).json({
      success: true,
      message: 'Campaign performance metrics retrieved successfully',
      data: {
        totalCampaigns: aggregateMetrics.totalCampaigns,
        totalSent: aggregateMetrics.totalSent,
        totalOpened: aggregateMetrics.totalOpened,
        totalClicked: aggregateMetrics.totalClicked,
        totalResponded: aggregateMetrics.totalResponded,
        totalFailed: aggregateMetrics.totalFailed,
        averageOpenRate: avgOpenRate,
        averageClickRate: avgClickRate,
        averageResponseRate: avgResponseRate,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching campaign performance metrics',
      error: error.message,
    });
  }
};

/**
 * Get monthly campaign activity (for charting)
 * @route GET /api/analytics/monthly-activity
 */
const getMonthlyActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get campaigns created per month (last 12 months)
    const monthlyData = await Campaign.aggregate([
      {
        $match: { owner: { $oid: userId } },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    // Transform to readable format
    const data = monthlyData.map((item) => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      campaigns: item.count,
    }));

    return res.status(200).json({
      success: true,
      message: 'Monthly activity retrieved successfully',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching monthly activity',
      error: error.message,
    });
  }
};

/**
 * Get top performing campaigns (by metrics)
 * @route GET /api/analytics/top-campaigns
 */
const getTopCampaigns = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 5 } = req.query;
    const limitNum = Math.min(parseInt(limit) || 5, 20);

    // Get campaigns sorted by open rate
    const topCampaigns = await Campaign.find({ owner: userId })
      .select('name type status metrics')
      .sort({ 'metrics.openRate': -1 })
      .limit(limitNum)
      .lean();

    const campaigns = topCampaigns.map((campaign) => ({
      id: campaign._id,
      name: campaign.name,
      type: campaign.type,
      status: campaign.status,
      sent: campaign.metrics?.totalSent || 0,
      opened: campaign.metrics?.totalOpened || 0,
      clicked: campaign.metrics?.totalClicked || 0,
      openRate: campaign.metrics?.openRate || 0,
      clickRate: campaign.metrics?.clickRate || 0,
    }));

    return res.status(200).json({
      success: true,
      message: 'Top campaigns retrieved successfully',
      data: campaigns,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching top campaigns',
      error: error.message,
    });
  }
};

/**
 * Get analytics overview (all key metrics at once)
 * @route GET /api/analytics/overview
 */
const getAnalyticsOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all data in parallel
    const [summary, statusBreakdown, contactStats, campaignPerf] = await Promise.all([
      getDashboardSummary({ user: { id: userId } }, res).then((r) => r.json?.() || null),
      getCampaignStatusBreakdown({ user: { id: userId } }, res).then((r) => r.json?.() || null),
      getContactStatistics({ user: { id: userId } }, res).then((r) => r.json?.() || null),
      getCampaignPerformance({ user: { id: userId } }, res).then((r) => r.json?.() || null),
    ]);

    // Fallback: Fetch data directly without helper functions
    const [totalContacts, totalCampaigns, activeCampaigns, campaignStatus] = await Promise.all([
      Contact.countDocuments({ owner: userId }),
      Campaign.countDocuments({ owner: userId }),
      Campaign.countDocuments({
        owner: userId,
        status: { $in: ['running', 'scheduled'] },
      }),
      Campaign.aggregate([
        {
          $match: { owner: { $oid: userId } },
        },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    // Format campaign status
    const statusResult = {
      draft: 0,
      scheduled: 0,
      running: 0,
      paused: 0,
      completed: 0,
      cancelled: 0,
    };

    campaignStatus.forEach((item) => {
      statusResult[item._id] = item.count;
    });

    return res.status(200).json({
      success: true,
      message: 'Analytics overview retrieved successfully',
      data: {
        summary: {
          totalContacts,
          totalCampaigns,
          activeCampaigns,
        },
        campaignStatus: statusResult,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching analytics overview',
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardSummary,
  getCampaignStatusBreakdown,
  getCampaignTypeDistribution,
  getRecentActivity,
  getContactStatistics,
  getCampaignPerformance,
  getMonthlyActivity,
  getTopCampaigns,
  getAnalyticsOverview,
};
