import React from 'react';
import { motion } from 'framer-motion';

/**
 * ChartPlaceholder Component
 * Placeholder for chart area until real analytics integration
 * Provides visual structure and animation guidance
 */
const ChartPlaceholder = ({ 
  title = 'Performance Overview',
  subtitle = 'Last 30 days',
  height = 'h-64'
}) => {
  // Generate mock chart bars for visual appeal
  const chartBars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    height: Math.random() * 80 + 20,
    delay: i * 0.05
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Export
          </motion.button>
        </div>
      </div>

      {/* Chart Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={`${height} bg-gray-50 rounded-lg p-6 flex flex-col items-end justify-end gap-2`}
      >
        {/* Mock Chart Bars */}
        <div className="w-full h-full flex items-end justify-around gap-1 pb-2">
          {chartBars.map((bar) => (
            <motion.div
              key={bar.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${bar.height}%`, opacity: 1 }}
              transition={{ 
                delay: bar.delay + 0.3,
                duration: 0.5,
                ease: 'easeOut'
              }}
              whileHover={{ 
                opacity: 0.8,
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)'
              }}
              className="flex-1 bg-gradient-to-t from-black to-gray-400 rounded-t cursor-pointer min-h-2"
            />
          ))}
        </div>

        {/* X-axis labels (month abbreviations) */}
        <div className="w-full flex justify-between text-xs text-gray-500 mt-2 px-1">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
            <span key={month} className="flex-1 text-center">{month}</span>
          ))}
        </div>
      </motion.div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-600"
      >
        <span>📊 Chart visualization • Backend integration pending</span>
        <span className="text-gray-400">Real-time data will appear here</span>
      </motion.div>
    </motion.div>
  );
};

export default ChartPlaceholder;
