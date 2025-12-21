/**
 * JWT Token Utility Functions
 * Handles JWT token generation and verification
 */

const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Generate JWT token for user
 * @param {string} userId - User ID from database
 * @returns {string} - JWT token
 */
const generateToken = (userId) => {
  try {
    const token = jwt.sign(
      { userId },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRY }
    );
    return token;
  } catch (error) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} - Decoded token data
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error(`Error verifying token: ${error.message}`);
  }
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} - Token or null
 */
const extractToken = (authHeader) => {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }
  
  return null;
};

module.exports = {
  generateToken,
  verifyToken,
  extractToken,
};
