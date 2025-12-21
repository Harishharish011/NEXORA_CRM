import React, { useState } from 'react';
import { AIAssistant, AnalyticsInsightsBox, AILoadingState, AIErrorMessage } from './AIAssistant';
import { generateAnalyticsInsights } from '../services/aiService';

/**
 * Analytics with AI Insights
 * Integrates AI analysis into campaign analytics dashboard
 */
export const AnalyticsWithAI = ({ 
  campaignName = 'Campaign',
  metrics = {},
  token 
}) => {
  const aiAssistant = AIAssistant({ type: 'analytics', token });
  const [timeframe, setTimeframe] = useState('30days');

  const handleGenerateInsights = async () => {
    await aiAssistant.generateInsights({
      metrics: {
        opens: metrics.opens || 0,
        clicks: metrics.clicks || 0,
        conversions: metrics.conversions || 0,
        sent: metrics.sent || 0,
        bounces: metrics.bounces || 0,
        openRate: metrics.openRate || 0,
        clickRate: metrics.clickRate || 0,
        conversionRate: metrics.conversionRate || 0,
      },
      timeframe,
      campaignName,
    });
  };

  const calculateRates = (metricsData) => {
    const sent = metricsData.sent || 1;
    return {
      openRate: metricsData.openRate || Math.round((metricsData.opens / sent) * 100),
      clickRate: metricsData.clickRate || Math.round((metricsData.clicks / sent) * 100),
      conversionRate: metricsData.conversionRate || Math.round((metricsData.conversions / sent) * 100),
    };
  };

  const rates = calculateRates(metrics);

  return (
    <div className="space-y-6">
      {/* Metrics Display */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-xs text-gray-600 mb-1">Sent</div>
          <div className="text-2xl font-bold text-blue-600">{metrics.sent || 0}</div>
        </div>

        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-xs text-gray-600 mb-1">Opens</div>
          <div className="text-2xl font-bold text-green-600">{metrics.opens || 0}</div>
          <div className="text-xs text-gray-500">{rates.openRate}%</div>
        </div>

        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-xs text-gray-600 mb-1">Clicks</div>
          <div className="text-2xl font-bold text-purple-600">{metrics.clicks || 0}</div>
          <div className="text-xs text-gray-500">{rates.clickRate}%</div>
        </div>

        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-xs text-gray-600 mb-1">Conversions</div>
          <div className="text-2xl font-bold text-orange-600">{metrics.conversions || 0}</div>
          <div className="text-xs text-gray-500">{rates.conversionRate}%</div>
        </div>

        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="text-xs text-gray-600 mb-1">Bounces</div>
          <div className="text-2xl font-bold text-red-600">{metrics.bounces || 0}</div>
          <div className="text-xs text-gray-500">{metrics.sent ? Math.round((metrics.bounces / metrics.sent) * 100) : 0}%</div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">✨ AI Analytics Assistant</h3>

        <div className="flex gap-3 items-end mb-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Timeframe
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>

          <button
            onClick={handleGenerateInsights}
            disabled={aiAssistant.loading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-medium rounded transition"
          >
            {aiAssistant.loading ? (
              <>
                <span className="inline-block animate-spin mr-2">⏳</span>
                Analyzing...
              </>
            ) : (
              '✨ Get Insights'
            )}
          </button>
        </div>

        {aiAssistant.loading && <AILoadingState />}

        {aiAssistant.error && (
          <AIErrorMessage
            error={aiAssistant.error}
            onDismiss={() => aiAssistant.setShowSuggestions(false)}
          />
        )}

        {aiAssistant.showSuggestions && (
          <AnalyticsInsightsBox
            insights={aiAssistant.suggestions}
            onClose={() => aiAssistant.setShowSuggestions(false)}
          />
        )}
      </div>
    </div>
  );
};

/**
 * Simple Metrics Card with AI Tooltip
 */
export const MetricCardWithAI = ({ label, value, percentage, color = 'blue' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
    red: 'bg-red-50 border-red-200 text-red-600',
  };

  return (
    <div
      className={`p-4 rounded-lg border ${colorClasses[color] || colorClasses.blue} cursor-pointer relative`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
      {percentage !== undefined && (
        <div className="text-xs text-gray-500 mt-1">{percentage}%</div>
      )}

      {showTooltip && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10">
          Click to view detailed breakdown
        </div>
      )}
    </div>
  );
};

export default AnalyticsWithAI;
