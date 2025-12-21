import React, { useState } from 'react';
import {
  generateEmailSuggestions,
  generateCampaignSummary,
  generateAnalyticsInsights,
  generateOutreachSuggestions,
} from '../services/aiService';

/**
 * AI Assistant Component
 * Provides AI-powered suggestions for:
 * - Email content generation
 * - Campaign summaries
 * - Analytics insights
 * - Outreach messages
 */
export const AIAssistant = ({
  type = 'email', // 'email', 'campaign', 'analytics', 'outreach'
  token,
  onSuggestionSelect,
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleError = (err) => {
    const message = err.message || 'An error occurred while generating suggestions';
    setError(message);
    console.error('AI Assistant Error:', err);
  };

  const generateEmailContent = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const result = await generateEmailSuggestions({
        ...params,
        token,
      });
      setSuggestions(result.suggestions);
      setShowSuggestions(true);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const generateCampaignAnalysis = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const result = await generateCampaignSummary({
        ...params,
        token,
      });
      setSuggestions(result);
      setShowSuggestions(true);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const result = await generateAnalyticsInsights({
        ...params,
        token,
      });
      setSuggestions(result);
      setShowSuggestions(true);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const generateOutreachContent = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const result = await generateOutreachSuggestions({
        ...params,
        token,
      });
      setSuggestions(result.suggestions);
      setShowSuggestions(true);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    setSuggestions,
    generateEmailContent,
    generateCampaignAnalysis,
    generateInsights,
    generateOutreachContent,
    handleError,
  };
};

/**
 * Email Suggestions Component
 * Displays email content suggestions from AI
 */
export const EmailSuggestionsBox = ({ suggestions, onSelect, onClose }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold text-gray-800">✨ AI Suggestions</h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-3 bg-white border border-blue-100 rounded cursor-pointer hover:border-blue-300 transition"
            onClick={() => onSelect(suggestion)}
          >
            <div className="text-xs font-semibold text-blue-600 mb-1">
              Suggestion {index + 1}
            </div>
            <div className="text-sm font-medium text-gray-700 mb-1">
              Subject: {suggestion.subject}
            </div>
            <div className="text-xs text-gray-600 mb-2 line-clamp-2">
              {suggestion.body}
            </div>
            <div className="text-xs text-blue-600 font-medium">
              CTA: {suggestion.cta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Campaign Summary Box
 * Displays AI-generated campaign analysis
 */
export const CampaignSummaryBox = ({ summary, onClose }) => {
  if (!summary) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold text-gray-800">✨ AI Analysis</h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <h5 className="text-xs font-semibold text-purple-700 mb-1">Summary</h5>
          <p className="text-sm text-gray-700">{summary.summary}</p>
        </div>

        <div>
          <h5 className="text-xs font-semibold text-purple-700 mb-1">Objective</h5>
          <p className="text-sm text-gray-700">{summary.objective}</p>
        </div>

        {summary.keyMessages && (
          <div>
            <h5 className="text-xs font-semibold text-purple-700 mb-1">
              Key Messages
            </h5>
            <ul className="text-sm text-gray-700 space-y-1">
              {summary.keyMessages.map((msg, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>{msg}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Analytics Insights Box
 * Displays AI-generated insights about metrics
 */
export const AnalyticsInsightsBox = ({ insights, onClose }) => {
  if (!insights) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold text-gray-800">✨ AI Insights</h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <h5 className="text-xs font-semibold text-green-700 mb-1">Summary</h5>
          <p className="text-sm text-gray-700">{insights.summary}</p>
        </div>

        {insights.insights && (
          <div>
            <h5 className="text-xs font-semibold text-green-700 mb-1">
              Key Insights
            </h5>
            <ul className="text-sm text-gray-700 space-y-1">
              {insights.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {insights.recommendations && (
          <div>
            <h5 className="text-xs font-semibold text-green-700 mb-1">
              Recommendations
            </h5>
            <ul className="text-sm text-gray-700 space-y-1">
              {insights.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-600 mr-2">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Outreach Suggestions Box
 * Displays personalized outreach message suggestions
 */
export const OutreachSuggestionsBox = ({ suggestions, onSelect, onClose }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold text-gray-800">✨ AI Suggestions</h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-3 bg-white border border-orange-100 rounded cursor-pointer hover:border-orange-300 transition"
            onClick={() => onSelect(suggestion)}
          >
            <div className="text-xs font-semibold text-orange-600 mb-2">
              Suggestion {index + 1}
            </div>

            <div className="text-sm font-medium text-gray-800 mb-2">
              {suggestion.greeting}
            </div>

            <div className="text-sm text-gray-700 mb-2">
              {suggestion.opening}
            </div>

            <div className="text-sm text-gray-700 mb-2">
              {suggestion.value}
            </div>

            <div className="text-sm font-medium text-orange-600">
              {suggestion.cta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * AI Loading Skeleton
 */
export const AILoadingState = () => (
  <div className="mt-4 p-4 bg-gray-100 rounded-lg animate-pulse">
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
  </div>
);

/**
 * AI Error Message
 */
export const AIErrorMessage = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">⚠️ Error</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
