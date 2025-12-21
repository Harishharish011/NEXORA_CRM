import React from 'react';
import { motion } from 'framer-motion';

/**
 * Chart Placeholder Component
 * Simple placeholder for charts in analytics dashboard
 */
const ChartPlaceholder = ({ title, type = 'line', height = '300px' }) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <svg viewBox="0 0 400 200" className="w-full" style={{ height: height }}>
            {/* Grid lines */}
            {[...Array(5)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={40 * i}
                x2="400"
                y2={40 * i}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}
            {[...Array(5)].map((_, i) => (
              <line
                key={`v-${i}`}
                x1={80 * i}
                y1="0"
                x2={80 * i}
                y2="200"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}
            {/* Line chart path */}
            <polyline
              points="10,150 90,80 170,110 250,50 330,90 390,30"
              fill="none"
              stroke="#374151"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Points */}
            <circle cx="10" cy="150" r="4" fill="#374151" />
            <circle cx="90" cy="80" r="4" fill="#374151" />
            <circle cx="170" cy="110" r="4" fill="#374151" />
            <circle cx="250" cy="50" r="4" fill="#374151" />
            <circle cx="330" cy="90" r="4" fill="#374151" />
            <circle cx="390" cy="30" r="4" fill="#374151" />
          </svg>
        );
      case 'bar':
        return (
          <svg viewBox="0 0 400 200" className="w-full" style={{ height: height }}>
            {/* Grid lines */}
            {[...Array(5)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={40 * i}
                x2="400"
                y2={40 * i}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}
            {/* Bars */}
            <rect x="30" y="80" width="30" height="100" fill="#3B82F6" rx="4" />
            <rect x="80" y="50" width="30" height="130" fill="#10B981" rx="4" />
            <rect x="130" y="70" width="30" height="110" fill="#F59E0B" rx="4" />
            <rect x="180" y="40" width="30" height="140" fill="#8B5CF6" rx="4" />
            <rect x="230" y="60" width="30" height="120" fill="#EC4899" rx="4" />
            <rect x="280" y="30" width="30" height="150" fill="#06B6D4" rx="4" />
            <rect x="330" y="55" width="30" height="125" fill="#3B82F6" rx="4" />
          </svg>
        );
      case 'pie':
        return (
          <svg viewBox="0 0 200 200" className="w-full" style={{ height: height }}>
            {/* Pie slices */}
            <circle cx="100" cy="100" r="80" fill="#3B82F6" opacity="0.3" />
            <path
              d="M 100 100 L 100 20 A 80 80 0 0 1 156.6 36.4 Z"
              fill="#3B82F6"
              opacity="1"
            />
            <path
              d="M 100 100 L 156.6 36.4 A 80 80 0 0 1 163.6 163.6 Z"
              fill="#10B981"
              opacity="1"
            />
            <path
              d="M 100 100 L 163.6 163.6 A 80 80 0 0 1 36.4 156.6 Z"
              fill="#F59E0B"
              opacity="1"
            />
            <path
              d="M 100 100 L 36.4 156.6 A 80 80 0 0 1 56.4 43.6 Z"
              fill="#8B5CF6"
              opacity="1"
            />
            <path
              d="M 100 100 L 56.4 43.6 A 80 80 0 0 1 100 20 Z"
              fill="#EC4899"
              opacity="1"
            />
            {/* Center circle for donut effect */}
            <circle cx="100" cy="100" r="50" fill="white" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-black mb-4">{title}</h3>
      <div className="overflow-x-auto">
        {renderChart()}
      </div>
    </motion.div>
  );
};

export default ChartPlaceholder;
