/**
 * Environment Variables Loader
 * Centralizes all environment variable configuration
 */

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/nexora-crm',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};

// Validate required environment variables in production
if (env.NODE_ENV === 'production') {
  const requiredVars = ['MONGO_URI', 'JWT_SECRET'];
  const missing = requiredVars.filter(
    (variable) => !process.env[variable]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

module.exports = env;
