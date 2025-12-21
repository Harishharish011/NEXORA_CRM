/**
 * Server Entry Point
 * Initializes database connection and starts the Express server
 */

const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

/**
 * Start Server Function
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    const server = app.listen(env.PORT, () => {
      console.log(`\n${'='.repeat(50)}`);
      console.log(`✅ Server running in ${env.NODE_ENV} mode`);
      console.log(`✅ Server running on port ${env.PORT}`);
      console.log(`✅ MongoDB connected`);
      console.log(`${'='.repeat(50)}\n`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (error) => {
      console.error(`❌ Unhandled Rejection: ${error.message}`);
      server.close(() => process.exit(1));
    });

    // Handle SIGTERM signal for graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

// Start the server
startServer();
