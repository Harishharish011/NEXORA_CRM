# AI-Powered Assistance Implementation Guide

## Overview

This guide provides comprehensive instructions for implementing AI-powered assistance features in the NEXORA CRM application. The system integrates OpenAI's API to provide intelligent suggestions for emails, campaigns, analytics, and outreach messages.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Frontend                               │
├─────────────────────────────────────────────────────────────────┤
│ Components:                                                       │
│ • EmailBuilderWithAI        - AI email content suggestions      │
│ • CampaignBuilderWithAI     - AI campaign analysis               │
│ • AnalyticsWithAI           - AI analytics insights              │
│ • ContactsAIAssistant       - Personalized outreach messages    │
│ • AIAssistant              - Core AI component & hooks          │
├─────────────────────────────────────────────────────────────────┤
│ Services:                                                         │
│ • aiService.js             - Frontend API calls                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                        HTTP/API Calls
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Node.js Backend                               │
├─────────────────────────────────────────────────────────────────┤
│ Routes:                                                           │
│ • POST /api/ai/email-suggestions                               │
│ • POST /api/ai/campaign-summary                                │
│ • POST /api/ai/analytics-insights                              │
│ • POST /api/ai/outreach-suggestions                            │
│ • GET /api/ai/status                                           │
├─────────────────────────────────────────────────────────────────┤
│ Services:                                                         │
│ • ai.service.js            - OpenAI integration & prompts       │
│ • Validation & Rate limiting                                    │
│ • Error handling                                                │
└─────────────────────────────────────────────────────────────────┘
                               │
                        OpenAI API
                               │
                               ▼
                    ┌──────────────────┐
                    │ OpenAI (GPT-4)   │
                    └──────────────────┘
```

## Components

### 1. AIAssistant Hook (Core)

**Location:** `crm-frontend/src/components/ai/AIAssistant.jsx`

Main hook providing state management for AI operations:

```jsx
import { AIAssistant } from './components/ai/AIAssistant';

// Usage in components
const aiAssistant = AIAssistant({ 
  type: 'email',        // 'email', 'campaign', 'analytics', 'outreach'
  token: authToken 
});

// Properties
aiAssistant.loading           // Boolean: request in progress
aiAssistant.error             // String: error message
aiAssistant.suggestions       // Object: AI response data
aiAssistant.showSuggestions   // Boolean: visibility state

// Methods
aiAssistant.generateEmailContent()      // Generate email suggestions
aiAssistant.generateCampaignAnalysis()  // Analyze campaign
aiAssistant.generateInsights()          // Analytics insights
aiAssistant.generateOutreachContent()   // Outreach messages
```

### 2. EmailBuilderWithAI

**Location:** `crm-frontend/src/components/ai/EmailBuilderWithAI.jsx`

Provides AI assistance for email composition:

```jsx
import { EmailBuilderWithAI } from './components/ai/EmailBuilderWithAI';

<EmailBuilderWithAI 
  recipientName="John Smith"
  recipientCompany="Tech Corp"
  token={authToken}
  onEmailSelect={(email) => saveEmail(email)}
/>
```

**Features:**
- Email type selection (follow-up, introduction, meeting request, etc.)
- Tone selection (professional, casual, assertive, friendly)
- Campaign context input
- AI-generated subject lines, body copy, and CTAs
- One-click selection to populate fields

### 3. CampaignBuilderWithAI

**Location:** `crm-frontend/src/components/ai/CampaignBuilderWithAI.jsx`

Analyzes campaign structure and generates optimization suggestions:

```jsx
import { CampaignBuilderWithAI } from './components/ai/CampaignBuilderWithAI';

<CampaignBuilderWithAI 
  campaignData={{
    name: 'Q1 Launch',
    description: '...',
    goal: 'Generate 100 leads',
    targetAudience: ['Tech execs', 'Enterprise buyers']
  }}
  token={authToken}
/>
```

**Features:**
- Campaign name, description, goal input
- Target audience specification
- AI analysis of campaign structure
- Key messages extraction
- Optimization suggestions

### 4. AnalyticsWithAI

**Location:** `crm-frontend/src/components/ai/AnalyticsWithAI.jsx`

Interprets metrics and provides insights:

```jsx
import { AnalyticsWithAI } from './components/ai/AnalyticsWithAI';

<AnalyticsWithAI 
  campaignName="Q1 Launch"
  metrics={{
    sent: 1000,
    opens: 350,
    clicks: 85,
    conversions: 12,
    bounces: 5
  }}
  token={authToken}
/>
```

**Features:**
- Metrics display (sent, opens, clicks, conversions, bounces)
- Timeframe selection (7d, 30d, 90d, all-time)
- AI-generated insights and analysis
- Recommendations for improvement
- Trend interpretation

### 5. ContactsAIAssistant

**Location:** `crm-frontend/src/components/ai/ContactsAIAssistant.jsx`

Generates personalized outreach messages:

```jsx
import { ContactsAIAssistant, ContactCardWithAI, BulkOutreachWithAI } 
  from './components/ai/ContactsAIAssistant';

// Single contact
<ContactsAIAssistant 
  contact={{
    name: 'Jane Doe',
    title: 'VP of Sales',
    company: 'Fortune 500',
    industry: 'Technology'
  }}
  token={authToken}
/>

// Multiple contacts bulk outreach
<BulkOutreachWithAI 
  contacts={contactsList}
  token={authToken}
/>
```

**Features:**
- Message type selection (initial, follow-up, reconnect, etc.)
- Tone customization
- Custom value proposition input
- Personalized message generation
- Bulk outreach capabilities
- Message template with placeholders
- Preview functionality

## Frontend Service (aiService.js)

**Location:** `crm-frontend/src/services/aiService.js`

Handles all API communication with backend:

```javascript
import { 
  generateEmailSuggestions,
  generateCampaignSummary,
  generateAnalyticsInsights,
  generateOutreachSuggestions,
  checkAIAvailability
} from './services/aiService';

// Example: Generate email suggestions
const suggestions = await generateEmailSuggestions({
  recipientName: 'John',
  recipientCompany: 'Acme Corp',
  emailType: 'follow-up',
  campaignContext: 'Q1 Product Launch',
  tone: 'professional',
  token: authToken
});

// Response structure:
{
  suggestions: [
    {
      subject: "Quick follow-up on Q1 Launch",
      body: "Hi John, I wanted to follow up on...",
      cta: "Schedule a demo"
    }
  ]
}
```

### API Endpoints

All endpoints require Bearer token authentication.

**1. Email Suggestions**
```
POST /api/ai/email-suggestions
Content-Type: application/json
Authorization: Bearer {token}

{
  "recipientName": "John Smith",
  "recipientCompany": "Tech Corp",
  "emailType": "follow-up",
  "campaignContext": "Q1 Launch",
  "tone": "professional"
}

Response:
{
  "data": {
    "suggestions": [
      {
        "subject": "...",
        "body": "...",
        "cta": "..."
      }
    ]
  }
}
```

**2. Campaign Summary**
```
POST /api/ai/campaign-summary
Content-Type: application/json
Authorization: Bearer {token}

{
  "campaignName": "Q1 Launch",
  "campaignDescription": "Description here",
  "campaignGoal": "Generate 100 leads",
  "targetAudience": ["Tech executives", "Enterprise buyers"]
}

Response:
{
  "data": {
    "summary": "...",
    "objective": "...",
    "keyMessages": ["...", "..."]
  }
}
```

**3. Analytics Insights**
```
POST /api/ai/analytics-insights
Content-Type: application/json
Authorization: Bearer {token}

{
  "metrics": {
    "openRate": 35,
    "clickRate": 8.5,
    "conversionRate": 1.2,
    "sent": 1000,
    "bounces": 5
  },
  "timeframe": "30days",
  "campaignName": "Q1 Launch"
}

Response:
{
  "data": {
    "summary": "...",
    "insights": ["...", "..."],
    "recommendations": ["...", "..."]
  }
}
```

**4. Outreach Suggestions**
```
POST /api/ai/outreach-suggestions
Content-Type: application/json
Authorization: Bearer {token}

{
  "contactName": "Jane Doe",
  "contactRole": "VP of Sales",
  "companyName": "Fortune 500",
  "industry": "Technology",
  "tone": "professional",
  "value": "Reduce churn by 25%"
}

Response:
{
  "data": {
    "suggestions": [
      {
        "greeting": "Hi Jane,",
        "opening": "I noticed...",
        "value": "We help companies...",
        "cta": "Let's schedule a quick call"
      }
    ]
  }
}
```

**5. Health Check**
```
GET /api/ai/status
Authorization: Bearer {token}

Response:
{
  "data": {
    "available": true,
    "provider": "openai",
    "models": ["gpt-4", "gpt-3.5-turbo"]
  }
}
```

## Backend Implementation

### AI Service (ai.service.js)

**Location:** `crm-backend/src/services/ai.service.js`

Core service interfacing with OpenAI:

```javascript
const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

class AIService {
  
  // Email suggestions
  async generateEmailSuggestions(params) {
    const prompt = `Generate 3 email suggestions for:
- Recipient: ${params.recipientName} at ${params.recipientCompany}
- Type: ${params.emailType}
- Context: ${params.campaignContext}
- Tone: ${params.tone}

Return JSON with subjects, bodies, and CTAs.`;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content);
  }

  // Campaign analysis
  async generateCampaignSummary(params) {
    const prompt = `Analyze this campaign and provide strategy:
Name: ${params.campaignName}
Description: ${params.campaignDescription}
Goal: ${params.campaignGoal}
Audience: ${params.targetAudience.join(', ')}

Return JSON with summary, objective, and key messages.`;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content);
  }

  // Analytics interpretation
  async generateAnalyticsInsights(params) {
    const prompt = `Analyze these campaign metrics and provide insights:
${JSON.stringify(params.metrics, null, 2)}

Provide summary, key insights, and recommendations.`;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content);
  }

  // Outreach personalization
  async generateOutreachSuggestions(params) {
    const prompt = `Generate 3 personalized outreach messages for:
Name: ${params.contactName}
Role: ${params.contactRole}
Company: ${params.companyName}
Industry: ${params.industry}
Tone: ${params.tone}
Value: ${params.value}

Return JSON with greeting, opening, value proposition, and CTA.`;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content);
  }
}

module.exports = new AIService();
```

### Routes (ai.routes.js)

**Location:** `crm-backend/src/routes/ai.routes.js`

```javascript
const router = require('express').Router();
const aiController = require('../controllers/ai.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validateAIRequest } = require('../middlewares/validation.middleware');

// All routes require authentication
router.use(authenticate);

// Email suggestions
router.post(
  '/email-suggestions',
  validateAIRequest('email'),
  aiController.generateEmailSuggestions
);

// Campaign summary
router.post(
  '/campaign-summary',
  validateAIRequest('campaign'),
  aiController.generateCampaignSummary
);

// Analytics insights
router.post(
  '/analytics-insights',
  validateAIRequest('analytics'),
  aiController.generateAnalyticsInsights
);

// Outreach suggestions
router.post(
  '/outreach-suggestions',
  validateAIRequest('outreach'),
  aiController.generateOutreachSuggestions
);

// Health check
router.get('/status', aiController.checkStatus);

module.exports = router;
```

### Controller (ai.controller.js)

**Location:** `crm-backend/src/controllers/ai.controller.js`

```javascript
const aiService = require('../services/ai.service');
const AILogger = require('../utils/aiLogger');

class AIController {
  
  async generateEmailSuggestions(req, res) {
    try {
      const userId = req.user.id;
      const params = req.body;

      AILogger.log({
        type: 'email_suggestions',
        userId,
        recipient: params.recipientName,
      });

      const suggestions = await aiService.generateEmailSuggestions(params);

      res.json({
        data: { suggestions },
        success: true,
      });

    } catch (error) {
      AILogger.error({
        type: 'email_suggestions',
        userId: req.user.id,
        error: error.message,
      });

      res.status(500).json({
        message: 'Failed to generate email suggestions',
        error: error.message,
      });
    }
  }

  // Similar methods for other endpoints...

  async checkStatus(req, res) {
    res.json({
      data: {
        available: true,
        provider: 'openai',
        models: ['gpt-4', 'gpt-3.5-turbo'],
      },
    });
  }
}

module.exports = new AIController();
```

## Integration Guide

### Step 1: Setup OpenAI API

1. Get API key from https://platform.openai.com
2. Add to `.env`:
   ```
   OPENAI_API_KEY=sk-...
   OPENAI_MODEL=gpt-4
   OPENAI_RATE_LIMIT=20  # requests per minute
   ```

### Step 2: Register Routes

In `crm-backend/src/routes/index.js`:

```javascript
const aiRoutes = require('./ai.routes');

router.use('/ai', aiRoutes);
```

### Step 3: Add Frontend Components

Import and use components:

```jsx
// In Email Builder
import { EmailBuilderWithAI } from './components/ai/EmailBuilderWithAI';

// In Campaigns
import { CampaignBuilderWithAI } from './components/ai/CampaignBuilderWithAI';

// In Analytics
import { AnalyticsWithAI } from './components/ai/AnalyticsWithAI';

// In Contacts
import { ContactsAIAssistant } from './components/ai/ContactsAIAssistant';
```

### Step 4: Environment Configuration

**Frontend (.env or .env.local):**
```
VITE_API_URL=http://localhost:5000/api
VITE_ENABLE_AI=true
VITE_AI_PROVIDER=openai
```

**Backend (.env):**
```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW=60000  # 1 minute
RATE_LIMIT_MAX_REQUESTS=20
```

## Error Handling

### Frontend Error Handling

```jsx
// Using AIErrorMessage component
{error && (
  <AIErrorMessage 
    error={error}
    onDismiss={() => setError(null)}
  />
)}

// Common errors:
- "Authentication token required"
- "Failed to generate suggestions"
- "AI service unavailable"
- "Rate limit exceeded"
- "Invalid input parameters"
```

### Backend Error Handling

```javascript
// Rate limiting
if (requestCount > RATE_LIMIT) {
  return res.status(429).json({
    message: 'Too many requests. Please try again later.',
  });
}

// Invalid input
if (!validateInput(params)) {
  return res.status(400).json({
    message: 'Invalid parameters provided.',
  });
}

// API errors
if (error.response?.status === 401) {
  return res.status(401).json({
    message: 'OpenAI API key invalid or expired.',
  });
}

// Timeout
if (error.code === 'ETIMEDOUT') {
  return res.status(504).json({
    message: 'AI service timeout. Please try again.',
  });
}
```

## Security Considerations

### API Key Management
- ✅ Store OPENAI_API_KEY in backend .env only
- ❌ Never expose API key in frontend
- ✅ Use rate limiting to prevent abuse
- ✅ Validate all user inputs

### Data Privacy
- ✅ Log only non-sensitive metadata
- ✅ Don't send PII to OpenAI without consent
- ❌ Don't cache AI responses with personal data
- ✅ Implement request/response encryption (HTTPS)

### Rate Limiting
```javascript
// Implement per-user rate limiting
const getRateLimit = (userId) => {
  // Check Redis or database
  // Limit to N requests per minute
};
```

## Performance Optimization

### Caching
```javascript
// Cache common suggestions
const cacheKey = `ai_${type}_${hash(params)}`;
const cached = await redis.get(cacheKey);

if (cached) return JSON.parse(cached);

const result = await generateAI(params);
await redis.setex(cacheKey, 3600, JSON.stringify(result));
```

### Streaming Responses
```javascript
// For long responses, use streaming
const stream = await openai.createChatCompletionStream({
  model: "gpt-4",
  messages: [...],
});

stream.on('data', (chunk) => {
  res.write(chunk);
});
```

### Async Processing
```javascript
// For heavy operations, use job queue
const job = await jobQueue.add('generate_campaign_analysis', {
  campaignId: params.campaignId,
});

res.json({ jobId: job.id });

// Poll for results
```

## Testing

### Frontend Tests
```jsx
import { render, screen, waitFor } from '@testing-library/react';
import { EmailBuilderWithAI } from './EmailBuilderWithAI';

describe('EmailBuilderWithAI', () => {
  it('should generate suggestions on button click', async () => {
    render(<EmailBuilderWithAI token="test-token" />);
    
    const button = screen.getByText('Generate Suggestions');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/Suggestion 1/)).toBeInTheDocument();
    });
  });
});
```

### Backend Tests
```javascript
describe('AI Service', () => {
  it('should generate email suggestions', async () => {
    const params = {
      recipientName: 'John',
      recipientCompany: 'Acme',
      emailType: 'follow-up',
      campaignContext: 'Q1 Launch',
      tone: 'professional'
    };

    const suggestions = await aiService.generateEmailSuggestions(params);
    
    expect(suggestions).toHaveProperty('suggestions');
    expect(suggestions.suggestions.length).toBeGreaterThan(0);
  });
});
```

## Troubleshooting

### Issue: "OpenAI API key invalid"
**Solution:** 
- Check .env file has correct OPENAI_API_KEY
- Verify key is not expired at https://platform.openai.com
- Ensure backend can access .env file

### Issue: "Rate limit exceeded"
**Solution:**
- Check request frequency
- Implement client-side debouncing
- Adjust RATE_LIMIT_MAX_REQUESTS in .env

### Issue: "AI service timeout"
**Solution:**
- Increase API request timeout
- Use async job queue for heavy operations
- Check OpenAI API status

### Issue: "Suggestions not appearing"
**Solution:**
- Check browser console for errors
- Verify authentication token is valid
- Ensure backend endpoint is accessible
- Check CORS configuration

## Feature Expansion

### Future Enhancements

1. **Multi-language Support**
   - Add language parameter to all endpoints
   - Translate prompts based on user locale

2. **Custom Models**
   - Allow users to select GPT-3.5 vs GPT-4
   - Add industry-specific fine-tuned models

3. **Template Library**
   - Store favorite suggestions as templates
   - Share templates across teams

4. **Feedback Loop**
   - Track which suggestions users select
   - Improve model performance over time
   - A/B testing of suggestions

5. **Integration with Analytics**
   - Track performance of AI-generated content
   - Correlate suggestions with conversion rates
   - Machine learning optimization

6. **Batch Operations**
   - Generate suggestions for multiple contacts
   - Bulk campaign analysis
   - Automated reporting

## Maintenance

### Regular Tasks
- Monitor API usage and costs
- Check rate limit effectiveness
- Review error logs for patterns
- Update OpenAI library version
- Test with new GPT models

### Documentation Updates
- Keep component props updated
- Add new endpoint documentation
- Update error codes list
- Maintain example implementations

## Support & Resources

- **OpenAI Docs:** https://platform.openai.com/docs
- **API Reference:** https://platform.openai.com/docs/api-reference
- **Community:** https://community.openai.com
- **Status:** https://status.openai.com

---

**Last Updated:** 2024
**Version:** 1.0.0
**Maintainer:** AI Assistant Implementation Team
