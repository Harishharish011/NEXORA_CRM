import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageWrapper Component
 * Provides consistent page animations and structure
 * All pages should be wrapped with this component
 */
const PageWrapper = ({ children, title, description }) => {
  // Quotes based on page titles
  const quotes = {
    'Dashboard': '"Success is the sum of small efforts repeated day in and day out." - Robert Collier',
    'Contacts': '"Building relationships is the most important investment you can make." - Jack Ma',
    'Campaigns': '"Great marketing is about telling a story that resonates with your audience." - Seth Godin',
    'Social Posting': '"Social media is not about the technology. It\'s about sociology." - Marc Benioff',
    'Email Builder': '"Email marketing has the highest ROI of any marketing channel." - HubSpot',
    'Scheduler': '"Time is the most valuable currency you have. Use it wisely." - Unknown',
    'Analytics': '"Data is the new oil. Make sure you\'re mining it effectively." - Clive Humby',
    'Integrations': '"Automation is the key to scaling your business efficiently." - Unknown',
    'Service': '"Customer service is not a department, it\'s an attitude." - Unknown',
    'Automation': '"Work smarter, not harder. Let automation handle the repetitive tasks." - Unknown'
  };

  const selectedQuote = quotes[title] || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Page Header */}
      {title && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-black mb-2">{title}</h1>
          {description && (
            <p className="text-gray-600 text-lg mb-3">{description}</p>
          )}
          {selectedQuote && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              {selectedQuote}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PageWrapper;
