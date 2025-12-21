import React from 'react';
import { motion } from 'framer-motion';

/**
 * QuickActions Component
 * Provides quick action buttons for common CRM tasks
 */
const QuickActions = ({ actions }) => {
  const getActionIcon = (label) => {
    const iconProps = "w-6 h-6";
    
    switch (label) {
      case 'Add Contact':
        return (
          <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        );
      case 'Create Campaign':
        return (
          <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'Schedule Email':
        return (
          <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {actions.map((action, index) => (
        <motion.button
          key={action.id}
          variants={itemVariants}
          whileHover={{ 
            y: -4,
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)'
          }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-lg border border-gray-200 bg-white transition-all duration-200 flex items-center justify-center gap-3 group"
        >
          <motion.div
            whileHover={{ rotate: 10 }}
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
            style={{ 
              backgroundColor: `${action.color}15`,
              color: action.color
            }}
          >
            {getActionIcon(action.label)}
          </motion.div>
          <span className="font-medium text-gray-900 text-sm">{action.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuickActions;
