import React from 'react';
import { motion } from 'framer-motion';

/**
 * ActivityItem Component
 * Displays a single activity entry with icon, description, and timestamp
 */
const ActivityItem = ({ 
  type, 
  description, 
  timestamp, 
  color,
  index = 0 
}) => {
  const getActivityIcon = (type) => {
    const iconProps = "w-5 h-5";
    
    switch (type.toLowerCase()) {
      case 'contact added':
        return (
          <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        );
      case 'campaign created':
      case 'campaign completed':
        return (
          <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'email sent':
        return (
          <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'integration connected':
        return (
          <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
      default:
        return (
          <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="flex items-start gap-4 p-4 rounded-lg cursor-pointer group bg-transparent hover:bg-gray-50 transition-colors duration-200"
    >
      {/* Icon Container */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
        style={{ 
          backgroundColor: `${color}15`,
          color: color
        }}
      >
        {getActivityIcon(type)}
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm">{type}</p>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
      </div>

      {/* Timestamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.08 + 0.1 }}
        className="text-gray-500 text-xs flex-shrink-0 whitespace-nowrap"
      >
        {timestamp}
      </motion.div>
    </motion.div>
  );
};

export default ActivityItem;
