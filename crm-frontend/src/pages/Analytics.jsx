import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import StatCard from '../components/dashboard/StatCard';
import ChartPlaceholder from '../components/analytics/ChartPlaceholder';
import EngagementTable from '../components/analytics/EngagementTable';
import { PageLoader } from '../components/common/Loader';
import { SectionErrorBoundary } from '../components/common/ErrorBoundary';
import { Button } from '../components/common/FormElements';
import {
  analyticsKPIData,
  engagementTableData
} from '../data/analyticsMockData';

/**
 * Analytics & Insights Page
 * Final component of Step 3 - CRM Dashboard
 * Displays KPIs, performance charts, and engagement metrics
 */
const Analytics = () => {
  const [dateRange, setDateRange] = useState('30');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

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
      title="Analytics"
      description="Track performance and engagement metrics"
    >
      {/* Page Loading State */}
      {isLoading && <PageLoader />}

      {!isLoading && (
      <div className="space-y-8 pb-8">
        {/* =====================
            DATE RANGE SELECTOR
            ===================== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-3 flex-wrap"
        >
          {['7', '30', '90'].map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? 'primary' : 'secondary'}
              onClick={() => setDateRange(range)}
              size="sm"
            >
              Last {range} days
            </Button>
          ))}
        </motion.div>

        {/* =====================
            SECTION 1: KPI CARDS
            ===================== */}
        <SectionErrorBoundary
          fallbackTitle="Failed to load KPI cards"
          fallbackDescription="There was a problem displaying your key performance indicators."
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {analyticsKPIData.map((card) => (
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
            SECTION 2: CHARTS GRID
            ===================== */}
        <SectionErrorBoundary
          fallbackTitle="Failed to load charts"
          fallbackDescription="There was a problem displaying your performance charts."
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <motion.div variants={itemVariants}>
              <ChartPlaceholder
                title="Email Engagement Over Time"
                type="line"
                height="300px"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ChartPlaceholder
                title="Campaign Performance Comparison"
                type="bar"
                height="300px"
              />
            </motion.div>
          </motion.div>
        </SectionErrorBoundary>

        {/* =====================
            SECTION 3: LEAD SOURCE PIE CHART
            ===================== */}
        <SectionErrorBoundary
          fallbackTitle="Failed to load lead source data"
          fallbackDescription="There was a problem displaying your lead source analysis."
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <motion.div variants={itemVariants}>
              <ChartPlaceholder
                title="Lead Source Distribution"
                type="pie"
                height="300px"
              />
            </motion.div>

            {/* Lead Source Legend */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-black mb-4">Lead Sources</h3>
              <div className="space-y-3">
                {[
                  { name: 'Email', value: '35%', color: '#F59E0B' },
                  { name: 'Social Media', value: '28%', color: '#3B82F6' },
                  { name: 'Organic Search', value: '20%', color: '#10B981' },
                  { name: 'Paid Ads', value: '12%', color: '#8B5CF6' },
                  { name: 'Referral', value: '5%', color: '#EC4899' }
                ].map((source, index) => (
                  <motion.div
                    key={source.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {source.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {source.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </SectionErrorBoundary>

        {/* =====================
            SECTION 4: ENGAGEMENT TABLE
            ===================== */}
        <SectionErrorBoundary
          fallbackTitle="Failed to load engagement data"
          fallbackDescription="There was a problem displaying your engagement metrics."
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <EngagementTable data={engagementTableData} />
            </motion.div>
          </motion.div>
        </SectionErrorBoundary>

        {/* =====================
            SECTION 5: INSIGHTS CARDS
            ===================== */}
        <SectionErrorBoundary
          fallbackTitle="Failed to load insights"
          fallbackDescription="There was a problem displaying your performance insights."
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Peak Performance</h4>
                  <p className="text-sm text-gray-700">
                    Email campaigns perform best on Wednesday mornings with 42.1% average engagement rate.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Top Channel</h4>
                  <p className="text-sm text-gray-700">
                    Social Media drives 28% of leads with consistent month-over-month growth.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </SectionErrorBoundary>
      </div>
      )}
    </PageWrapper>
  );
};

export default Analytics;
