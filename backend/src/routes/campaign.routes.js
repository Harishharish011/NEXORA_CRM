const express = require('express');
const router = express.Router();
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  addContacts,
  launchCampaign,
  pauseCampaign,
  getCampaignMetrics,
} = require('../controllers/campaign.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// All routes are protected with JWT authentication
router.use(authMiddleware);

// Campaign CRUD operations
router.post('/', createCampaign);
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

// Campaign-specific operations
router.post('/:id/add-contacts', addContacts);
router.post('/:id/launch', launchCampaign);
router.post('/:id/pause', pauseCampaign);
router.get('/:id/metrics', getCampaignMetrics);

module.exports = router;
