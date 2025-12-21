import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import StatCard from '../components/dashboard/StatCard';
import ActivityItem from '../components/dashboard/ActivityItem';
import ChartPlaceholder from '../components/dashboard/ChartPlaceholder';
import QuickActions from '../components/dashboard/QuickActions';
import { PageLoader, SkeletonLoader } from '../components/common/Loader';
import { SectionErrorBoundary } from '../components/common/ErrorBoundary';
import theme from '../theme/theme';
import { 
  statCardsData, 
  recentActivityData, 
  performanceMetricsData,
  quickActionsData 
} from '../data/dashboardMockData';

/**
 * Dashboard / Home Workspace Page
 * Main hub for CRM overview and quick access to key features
 * - Status metrics overview
 * - Performance visualization
 * - Recent activity tracking
 * - Quick action buttons
 */
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Container and item animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <PageWrapper
      title="Dashboard"
      description="Overview of your CRM performance"
    >
      {/* Page Loading State */}
      {isLoading && <PageLoader />}

      {!isLoading && (
      <div className="space-y-8 pb-8">
        {/* =====================
            SECTION 1: STAT CARDS
            ===================== */}
        <SectionErrorBoundary
          fallbackTitle="Failed to load statistics"
          fallbackDescription="There was a problem displaying your stats."
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {statCardsData.map((card) => (
              <motion.div key={card.id} variants={itemVariants}>
                <StatCard
                  title={card.title}
                  value={card.value}
                  change={card.change}
                  trend={card.trend}
                  color={card.color}
                  bgColor={card.bgColor}
                />
              </motion.div>
            ))}
          </motion.div>
        </SectionErrorBoundary>

        {/* =====================
            SECTION 2: MAIN GRID (Chart + Quick Stats)
            ===================== */}
        <SectionErrorBoundary
          fallbackTitle="Failed to load performance data"
          fallbackDescription="There was a problem displaying your performance metrics."
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Chart Area */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <ChartPlaceholder
                title="Performance Overview"
                subtitle="Last 30 days"
                height="h-72"
              />
            </motion.div>

            {/* Quick Stats Sidebar */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Quick Metrics
              </h3>
              
              <div className="space-y-4">
                {performanceMetricsData.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: metric.color }}
                    >
                      {metric.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </SectionErrorBoundary>

        {/* =====================
            SECTION 3: QUICK ACTIONS
            ===================== */}
        <SectionErrorBoundary
          fallbackTitle="Failed to load quick actions"
          fallbackDescription="There was a problem displaying quick actions."
        >
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Quick Actions
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Frequently used CRM functions
              </p>
            </div>
            <QuickActions actions={quickActionsData} />
          </motion.div>
        </SectionErrorBoundary>

        {/* =====================
            SECTION 4: RECENT ACTIVITY
            ===================== */}
        <SectionErrorBoundary
          fallbackTitle="Failed to load activity"
          fallbackDescription="There was a problem displaying recent activity."
        >
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Activity
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Latest updates and actions
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="View all activities"
              >
                View All →
              </motion.button>
            </div>

            {/* Activity List */}
            <motion.div
              className="space-y-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {recentActivityData.map((activity, index) => (
                <ActivityItem
                  key={activity.id}
                  type={activity.type}
                  description={activity.description}
                  timestamp={activity.timestamp}
                  color={activity.color}
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>
        </SectionErrorBoundary>
      </div>
      )}
    </PageWrapper>
  );
};

export default Dashboard;
