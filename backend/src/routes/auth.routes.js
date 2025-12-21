/**
 * Authentication Routes
 * Defines all authentication-related API endpoints
 */

const express = require('express');
const {
  signup,
  login,
  completeOnboarding,
} = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * Public Routes
 */

// Signup route
// POST /api/auth/signup
// Body: { email, password }
router.post('/signup', signup);

// Login route
// POST /api/auth/login
// Body: { email, password }
router.post('/login', login);

/**
 * Protected Routes (require JWT token)
 */

// Complete Onboarding route
// POST /api/auth/onboarding
// Headers: { Authorization: "Bearer <token>" }
// Body: { industry, role, companyName, companyUrl }
router.post('/onboarding', authMiddleware, completeOnboarding);

module.exports = router;
