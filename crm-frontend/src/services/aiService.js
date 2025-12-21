/**
 * AI Assistant Service
 * Frontend service for AI-powered content generation
 * Communicates with backend AI API endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Check if AI is available
 */
export const checkAIAvailability = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check AI availability');
    }

    const data = await response.json();
    return data.data?.available || false;
  } catch (error) {
    console.error('Error checking AI availability:', error);
    return false;
  }
};

/**
 * Generate email content suggestions
 * @param {Object} params
 * @param {string} params.campaignType - Type of campaign
 * @param {string} params.userPrompt - User's description
 * @param {string} params.tone - Email tone
 * @param {string} params.token - JWT token
 * @returns {Promise<Object>} - Suggestions with subject, body, cta
 */
export const generateEmailSuggestions = async ({
  campaignType,
  userPrompt,
  tone = 'professional',
  token,
}) => {
  try {
    if (!token) {
      throw new Error('Authentication token required');
    }

    const response = await fetch(`${API_BASE_URL}/ai/email-suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        campaignType,
        userPrompt,
        tone,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate email suggestions');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error generating email suggestions:', error);
    throw error;
  }
};

/**
 * Generate campaign summary
 * @param {Object} params
 * @param {string} params.campaignName - Campaign name
 * @param {string} params.campaignContent - Campaign content
 * @param {string} params.campaignType - Campaign type
 * @param {string} params.token - JWT token
 * @returns {Promise<Object>} - Summary, objective, key messages
 */
export const generateCampaignSummary = async ({
  campaignName,
  campaignContent,
  campaignType,
  token,
}) => {
  try {
    if (!token) {
      throw new Error('Authentication token required');
    }

    const response = await fetch(`${API_BASE_URL}/ai/campaign-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        campaignName,
        campaignContent,
        campaignType,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate campaign summary');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error generating campaign summary:', error);
    throw error;
  }
};

/**
 * Generate analytics insights
 * @param {Object} params
 * @param {Object} params.metrics - Campaign metrics
 * @param {Object} params.previousMetrics - Previous period metrics (optional)
 * @param {string} params.token - JWT token
 * @returns {Promise<Object>} - Summary, insights, recommendations
 */
export const generateAnalyticsInsights = async ({ metrics, previousMetrics, token }) => {
  try {
    if (!token) {
      throw new Error('Authentication token required');
    }

    const response = await fetch(`${API_BASE_URL}/ai/analytics-insights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        metrics,
        previousMetrics,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate analytics insights');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error generating analytics insights:', error);
    throw error;
  }
};

/**
 * Generate outreach message suggestions
 * @param {Object} params
 * @param {string} params.contactName - Contact name
 * @param {string} params.contactCompany - Contact company (optional)
 * @param {string} params.contactRole - Contact role (optional)
 * @param {string} params.purpose - Purpose of outreach
 * @param {string} params.token - JWT token
 * @returns {Promise<Object>} - Personalized message suggestions
 */
export const generateOutreachSuggestions = async ({
  contactName,
  contactCompany,
  contactRole,
  purpose,
  token,
}) => {
  try {
    if (!token) {
      throw new Error('Authentication token required');
    }

    const response = await fetch(`${API_BASE_URL}/ai/outreach-suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        contactName,
        contactCompany,
        contactRole,
        purpose,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate outreach suggestions');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error generating outreach suggestions:', error);
    throw error;
  }
};

export default {
  checkAIAvailability,
  generateEmailSuggestions,
  generateCampaignSummary,
  generateAnalyticsInsights,
  generateOutreachSuggestions,
};
