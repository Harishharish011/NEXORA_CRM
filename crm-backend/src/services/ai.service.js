/**
 * AI Service
 * Integrates with OpenAI API to provide AI-powered suggestions
 */

const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

class AIService {
  /**
   * Generate email content suggestions
   * @param {Object} params - Email parameters
   * @returns {Promise<Array>} Array of email suggestions
   */
  async generateEmailSuggestions(params) {
    try {
      const {
        recipientName,
        recipientCompany,
        emailType,
        campaignContext,
        tone,
      } = params;

      const prompt = `You are an expert email copywriter. Generate 3 different ${emailType} email suggestions for a sales professional.

Context:
- Recipient: ${recipientName} at ${recipientCompany}
- Campaign: ${campaignContext}
- Email Type: ${emailType}
- Tone: ${tone}

Requirements:
- Each email must have a compelling subject line
- Body should be concise (3-4 paragraphs max)
- Include a clear call-to-action
- Personalize for the recipient
- Match the specified tone

Return ONLY a JSON array with exactly 3 suggestions in this format:
[
  {
    "subject": "...",
    "body": "...",
    "cta": "..."
  }
]

No additional text, just the JSON array.`;

      const response = await openai.createChatCompletion({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = response.data.choices[0].message.content;
      const suggestions = JSON.parse(content);

      return suggestions;
    } catch (error) {
      throw new Error(`Failed to generate email suggestions: ${error.message}`);
    }
  }

  /**
   * Generate campaign summary and analysis
   * @param {Object} params - Campaign parameters
   * @returns {Promise<Object>} Campaign analysis
   */
  async generateCampaignSummary(params) {
    try {
      const {
        campaignName,
        campaignDescription,
        targetAudience,
        campaignGoal,
      } = params;

      const prompt = `You are a marketing strategist. Analyze the following campaign and provide strategic insights.

Campaign Details:
- Name: ${campaignName}
- Description: ${campaignDescription}
- Goal: ${campaignGoal}
- Target Audience: ${Array.isArray(targetAudience) ? targetAudience.join(', ') : targetAudience}

Provide:
1. A brief summary of the campaign strategy
2. The core objective
3. 3-4 key messages to emphasize

Return ONLY a JSON object in this format:
{
  "summary": "...",
  "objective": "...",
  "keyMessages": ["...", "...", "..."]
}

No additional text, just the JSON object.`;

      const response = await openai.createChatCompletion({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      const content = response.data.choices[0].message.content;
      const analysis = JSON.parse(content);

      return analysis;
    } catch (error) {
      throw new Error(`Failed to generate campaign summary: ${error.message}`);
    }
  }

  /**
   * Generate analytics insights
   * @param {Object} params - Metrics parameters
   * @returns {Promise<Object>} Analytics insights
   */
  async generateAnalyticsInsights(params) {
    try {
      const { metrics, timeframe, campaignName } = params;

      const prompt = `You are an analytics expert. Analyze these email campaign metrics and provide insights.

Campaign: ${campaignName}
Timeframe: ${timeframe}

Metrics:
${Object.entries(metrics)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\n')}

Provide:
1. A summary of overall campaign performance
2. 3-4 key insights from the metrics
3. 3-4 actionable recommendations

Return ONLY a JSON object in this format:
{
  "summary": "...",
  "insights": ["...", "...", "..."],
  "recommendations": ["...", "...", "..."]
}

No additional text, just the JSON object.`;

      const response = await openai.createChatCompletion({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      const content = response.data.choices[0].message.content;
      const insights = JSON.parse(content);

      return insights;
    } catch (error) {
      throw new Error(`Failed to generate analytics insights: ${error.message}`);
    }
  }

  /**
   * Generate personalized outreach messages
   * @param {Object} params - Contact parameters
   * @returns {Promise<Array>} Outreach message suggestions
   */
  async generateOutreachSuggestions(params) {
    try {
      const {
        contactName,
        contactRole,
        companyName,
        industry,
        value,
        tone,
      } = params;

      const prompt = `You are an expert at crafting personalized outreach messages. Generate 3 different personalized outreach messages for a sales professional.

Recipient Information:
- Name: ${contactName}
- Role/Title: ${contactRole}
- Company: ${companyName}
- Industry: ${industry}
- Tone: ${tone}

Value Proposition: ${value}

Requirements:
- Messages should feel personal and relevant to their role
- Highlight specific value for their situation
- Include natural greeting and strong CTA
- Match the specified tone
- Between 150-250 words per message

Return ONLY a JSON array with exactly 3 suggestions in this format:
[
  {
    "greeting": "...",
    "opening": "...",
    "value": "...",
    "cta": "..."
  }
]

No additional text, just the JSON array.`;

      const response = await openai.createChatCompletion({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 2000,
      });

      const content = response.data.choices[0].message.content;
      const suggestions = JSON.parse(content);

      return suggestions;
    } catch (error) {
      throw new Error(`Failed to generate outreach suggestions: ${error.message}`);
    }
  }

  /**
   * Check if AI service is available
   * @returns {Promise<Object>} Status information
   */
  async checkStatus() {
    try {
      const response = await openai.listModels();

      return {
        available: true,
        provider: 'openai',
        models: response.data.data.map((m) => m.id).slice(0, 5),
      };
    } catch (error) {
      return {
        available: false,
        provider: 'openai',
        error: error.message,
      };
    }
  }
}

module.exports = new AIService();
