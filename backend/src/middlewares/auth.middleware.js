/**
 * Authentication Middleware
 * Validates JWT tokens and attaches user info to requests
 */

const { extractToken, verifyToken } = require('../utils/token');
const User = require('../models/User.model');

/**
 * Middleware to verify JWT token and attach user to request
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = extractToken(req.headers.authorization);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please log in.',
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Fetch user from database
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Invalid token.',
      });
    }

    // Attach user to request for use in controllers
    req.user = user;
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Token verification failed.',
    });
  }
};

module.exports = authMiddleware;
