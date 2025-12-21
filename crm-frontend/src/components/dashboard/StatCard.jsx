import React from 'react';
import { motion } from 'framer-motion';

/**
 * StatCard Component
 * Displays a single metric with value, change, and icon
 * Reusable across dashboard and other pages
 */
const StatCard = ({ 
  title, 
  value, 
  change, 
  trend = 'up', 
  color, 
  bgColor,
  icon: IconComponent 
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-8" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
      className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden relative"
    >
      {/* Background accent */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -mr-10 -mt-10"
        style={{ backgroundColor: color }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with title and change badge */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ 
              backgroundColor: trend === 'up' ? '#DCFCE7' : '#FEE2E2',
              color: trend === 'up' ? '#16A34A' : '#DC2626'
            }}
          >
            {getTrendIcon()}
            {change}
          </motion.div>
        </div>

        {/* Value */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p 
            className="text-3xl font-bold"
            style={{ color }}
          >
            {value}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatCard;
