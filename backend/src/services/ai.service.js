/**
 * AI Service
 * Handles AI-powered suggestions and content generation
 * Uses OpenAI API for text generation
 */

const fetch = require('isomorphic-fetch');
const env = require('../config/env');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = 'gpt-3.5-turbo';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

/**
 * Validate AI service availability
 */
const isAIAvailable = () => {
  return !!OPENAI_API_KEY;
};

/**
 * Make request to OpenAI API
 * @private
 */
const callOpenAI = async (messages, maxTokens = 500) => {
  try {
    if (!isAIAvailable()) {
      throw new Error('AI service not configured. Set OPENAI_API_KEY environment variable.');
    }

    const response = await fetch(OPENAI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    throw error;
  }
};

/**
 * Generate email content suggestions
 * @param {Object} params - Generation parameters
 * @param {string} params.campaignType - Type of campaign (promotional, informational, newsletter, etc.)
 * @param {string} params.userPrompt - User's description of what email should contain
 * @param {string} params.tone - Tone of email (professional, casual, friendly, formal)
 * @returns {Promise<Object>} - Suggestions with subject, body, and CTA
 */
const generateEmailSuggestions = async ({ campaignType, userPrompt, tone = 'professional' }) => {
  try {
    if (!campaignType || !userPrompt) {
      throw new Error('campaignType and userPrompt are required');
    }

    const systemPrompt = `You are an expert email copywriter. Generate 3 email suggestions based on the user's request.
For each suggestion, provide:
1. Subject line (max 60 characters)
2. Email body (2-3 paragraphs, under 150 words)
3. Call-to-action text (max 10 words)

Format your response as JSON with this structure:
{
  "suggestions": [
    {
      "subject": "...",
      "body": "...",
      "cta": "..."
    }
  ]
}

Use a ${tone} tone.`;

    const userMessage = `Campaign Type: ${campaignType}
User Request: ${userPrompt}

Generate email suggestions that are compelling, clear, and actionable.`;

    const content = await callOpenAI([
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ]);

    // Parse JSON response
    let result = JSON.parse(content);

    // Validate response structure
    if (!result.suggestions || !Array.isArray(result.suggestions)) {
      throw new Error('Invalid response format from AI');
    }

    return {
      success: true,
      suggestions: result.suggestions.slice(0, 3), // Ensure max 3 suggestions
    };
  } catch (error) {
    console.error('Email generation error:', error.message);
    throw error;
  }
};

/**
 * Generate campaign summary
 * @param {Object} params - Summary parameters
 * @param {string} params.campaignName - Name of the campaign
 * @param {string} params.campaignContent - Full campaign content/body
 * @param {string} params.campaignType - Type of campaign
 * @returns {Promise<Object>} - Summary and key takeaways
 */
const generateCampaignSummary = async ({ campaignName, campaignContent, campaignType }) => {
  try {
    if (!campaignName || !campaignContent) {
      throw new Error('campaignName and campaignContent are required');
    }

    const systemPrompt = `You are an expert marketing analyst. Analyze the campaign and provide:
1. A brief 2-3 sentence summary of what the campaign does
2. The main goal/objective (1-2 sentences)
3. Key messages (3-5 bullet points)

Format as JSON:
{
  "summary": "...",
  "objective": "...",
  "keyMessages": ["...", "...", "..."]
}`;

    const userMessage = `Campaign Name: ${campaignName}
Campaign Type: ${campaignType || 'General'}
Campaign Content:
${campaignContent}

Analyze this campaign and provide summary, objective, and key messages.`;

    const content = await callOpenAI([
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ]);

    let result = JSON.parse(content);

    return {
      success: true,
      summary: result.summary,
      objective: result.objective,
      keyMessages: result.keyMessages,
    };
  } catch (error) {
    console.error('Campaign summary error:', error.message);
    throw error;
  }
};

/**
 * Generate analytics insights
 * @param {Object} params - Analytics parameters
 * @param {Object} params.metrics - Campaign metrics (sent, opened, clicked, etc.)
 * @param {string} params.previousMetrics - Optional previous period metrics for comparison
 * @returns {Promise<Object>} - Readable insights
 */
const generateAnalyticsInsights = async ({ metrics, previousMetrics = null }) => {
  try {
    if (!metrics) {
      throw new Error('metrics object is required');
    }

    const systemPrompt = `You are a data analyst expert. Convert analytics numbers into readable, actionable insights.
Provide:
1. Performance summary (1-2 sentences)
2. Key insights (3-5 bullet points)
3. Recommendation (1-2 actionable suggestions)

Format as JSON:
{
  "summary": "...",
  "insights": ["...", "..."],
  "recommendations": ["...", "..."]
}`;

    const metricsText = `
Metrics:
- Total Sent: ${metrics.totalSent || 0}
- Opened: ${metrics.totalOpened || 0} (${metrics.openRate || 0}%)
- Clicked: ${metrics.totalClicked || 0} (${metrics.clickRate || 0}%)
- Responded: ${metrics.totalResponded || 0} (${metrics.responseRate || 0}%)
- Failed: ${metrics.totalFailed || 0}
${previousMetrics ? `\nPrevious Period: Sent ${previousMetrics.sent}, Open Rate ${previousMetrics.openRate}%` : ''}
`;

    const userMessage = `Analyze these campaign metrics and provide insights and recommendations:${metricsText}`;

    const content = await callOpenAI([
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ]);

    let result = JSON.parse(content);

    return {
      success: true,
      summary: result.summary,
      insights: result.insights,
      recommendations: result.recommendations,
    };
  } catch (error) {
    console.error('Analytics insights error:', error.message);
    throw error;
  }
};

/**
 * Generate contact outreach suggestions
 * @param {Object} params - Outreach parameters
 * @param {string} params.contactName - Contact name
 * @param {string} params.contactCompany - Contact company
 * @param {string} params.contactRole - Contact role/position
 * @param {string} params.purpose - Purpose of outreach
 * @returns {Promise<Object>} - Personalized suggestions
 */
const generateOutreachSuggestions = async ({ contactName, contactCompany, contactRole, purpose }) => {
  try {
    if (!contactName || !purpose) {
      throw new Error('contactName and purpose are required');
    }

    const systemPrompt = `You are an expert at personalized outreach. Generate 2 personalized outreach message suggestions.
For each suggestion, provide:
1. Greeting (personalized to contact)
2. Opening statement (2-3 sentences)
3. Value proposition (2-3 sentences)
4. Call-to-action (1-2 sentences)

Format as JSON:
{
  "suggestions": [
    {
      "greeting": "...",
      "opening": "...",
      "value": "...",
      "cta": "..."
    }
  ]
}`;

    const userMessage = `Contact Information:
- Name: ${contactName}
${contactCompany ? `- Company: ${contactCompany}` : ''}
${contactRole ? `- Role: ${contactRole}` : ''}

Outreach Purpose: ${purpose}

Generate personalized outreach suggestions that feel authentic and value-focused.`;

    const content = await callOpenAI([
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ]);

    let result = JSON.parse(content);

    return {
      success: true,
      suggestions: result.suggestions.slice(0, 2),
    };
  } catch (error) {
    console.error('Outreach suggestions error:', error.message);
    throw error;
  }
};

module.exports = {
  isAIAvailable,
  generateEmailSuggestions,
  generateCampaignSummary,
  generateAnalyticsInsights,
  generateOutreachSuggestions,
};
