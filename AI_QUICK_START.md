# AI Implementation - Quick Start Guide

## 5-Minute Setup

### Prerequisites
- OpenAI API key (get from https://platform.openai.com)
- Backend running on localhost:5000
- Frontend running on localhost:5173

### Step 1: Add OpenAI API Key

**File:** `crm-backend/.env`

```
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4
```

### Step 2: Register AI Routes

**File:** `crm-backend/src/routes/index.js`

Add this line:
```javascript
const aiRoutes = require('./ai.routes');
router.use('/ai', aiRoutes);
```

### Step 3: Use in Components

**Example:** Email Builder Integration

```jsx
import { EmailBuilderWithAI } from './components/ai/EmailBuilderWithAI';

function EmailBuilderPage() {
  return (
    <EmailBuilderWithAI 
      recipientName="John Smith"
      recipientCompany="Tech Corp"
      token={userAuthToken}
    />
  );
}
```

**Example:** Campaign Builder Integration

```jsx
import { CampaignBuilderWithAI } from './components/ai/CampaignBuilderWithAI';

function CampaignPage() {
  return (
    <CampaignBuilderWithAI 
      campaignData={{
        name: 'Q1 Launch',
        description: '...',
        goal: 'Generate 100 leads',
        targetAudience: ['Tech execs']
      }}
      token={userAuthToken}
    />
  );
}
```

**Example:** Analytics Integration

```jsx
import { AnalyticsWithAI } from './components/ai/AnalyticsWithAI';

function AnalyticsDashboard() {
  return (
    <AnalyticsWithAI 
      campaignName="Q1 Launch"
      metrics={{
        sent: 1000,
        opens: 350,
        clicks: 85,
        conversions: 12
      }}
      token={userAuthToken}
    />
  );
}
```

**Example:** Contacts Integration

```jsx
import { ContactsAIAssistant } from './components/ai/ContactsAIAssistant';

function ContactDetail({ contact }) {
  return (
    <ContactsAIAssistant 
      contact={contact}
      token={userAuthToken}
    />
  );
}
```

## Component Features at a Glance

### EmailBuilderWithAI
- ✨ Generate email suggestions
- 🎯 Email type selection (follow-up, intro, meeting, proposal)
- 🗣️ Tone customization (professional, casual, assertive)
- 📧 One-click subject/body insertion

### CampaignBuilderWithAI
- 📊 Campaign structure analysis
- 🎯 Objective optimization
- 💡 Key messages extraction
- 📈 Growth recommendations

### AnalyticsWithAI
- 📈 Metrics visualization
- 💬 AI-powered interpretation
- 🔍 Actionable insights
- 📋 Recommendations

### ContactsAIAssistant
- 👤 Personalized message generation
- 🎯 Message type selection
- 🗣️ Tone customization
- 📨 Bulk outreach support

## API Response Examples

### Email Suggestions Response
```json
{
  "data": {
    "suggestions": [
      {
        "subject": "Quick follow-up on Q1 Launch - John",
        "body": "Hi John,\n\nI hope this email finds you well...",
        "cta": "Schedule a 15-minute demo"
      },
      {
        "subject": "Re: Q1 Launch Opportunity",
        "body": "Hi John,\n\nFollowing up on our conversation...",
        "cta": "Let's discuss next steps"
      }
    ]
  }
}
```

### Campaign Summary Response
```json
{
  "data": {
    "summary": "A comprehensive Q1 product launch campaign targeting tech executives...",
    "objective": "Establish market presence and generate enterprise leads",
    "keyMessages": [
      "Industry-leading features at 30% lower cost",
      "Trusted by Fortune 500 companies",
      "30-day risk-free trial"
    ]
  }
}
```

### Analytics Insights Response
```json
{
  "data": {
    "summary": "Campaign is performing above industry benchmarks...",
    "insights": [
      "Open rate of 35% exceeds industry standard of 21%",
      "Click rate is strong, indicating compelling content",
      "Conversion rate of 1.2% shows qualified audience"
    ],
    "recommendations": [
      "A/B test subject lines to improve engagement",
      "Follow up with non-openers after 48 hours",
      "Create separate track for high-value prospects"
    ]
  }
}
```

### Outreach Suggestions Response
```json
{
  "data": {
    "suggestions": [
      {
        "greeting": "Hi Jane,",
        "opening": "I noticed you recently joined Fortune 500 company as VP of Sales...",
        "value": "We help B2B SaaS companies reduce sales cycle by 40%",
        "cta": "Let me send you a personalized ROI calculation"
      }
    ]
  }
}
```

## Common Use Cases

### Use Case 1: Cold Email Campaign
```jsx
const [email, setEmail] = useState('');

<EmailBuilderWithAI 
  emailType="introduction"
  tone="professional"
  campaignContext="Cold outreach for enterprise deals"
  onEmailSelect={(suggestion) => {
    setEmail(suggestion);
    saveAsDraft(suggestion);
  }}
/>
```

### Use Case 2: Campaign Planning
```jsx
<CampaignBuilderWithAI 
  campaignData={{
    name: 'Holiday Sales Push',
    description: 'November-December promotion for premium plans',
    goal: 'Increase MRR by 50%',
    targetAudience: ['Current customers', 'Lapsed users']
  }}
/>
```

### Use Case 3: Performance Analysis
```jsx
const [timeframe, setTimeframe] = useState('30days');

<AnalyticsWithAI 
  metrics={campaignMetrics}
  timeframe={timeframe}
  onInsightsReady={(insights) => {
    updateDashboard(insights);
  }}
/>
```

### Use Case 4: Personalized Outreach
```jsx
<BulkOutreachWithAI 
  contacts={selectedContacts}
  messageTemplate={
    "Hi {name},\n" +
    "I see you're {title} at {company}...\n" +
    "We help companies like yours reduce costs by 25%."
  }
/>
```

## Troubleshooting Checklist

- [ ] OpenAI API key is valid and set in .env
- [ ] Backend server is running on localhost:5000
- [ ] Authentication token is being passed to components
- [ ] API endpoints are registered in backend routes
- [ ] CORS is properly configured
- [ ] No console errors in browser dev tools
- [ ] Network tab shows successful API calls
- [ ] Backend .env file has OPENAI_API_KEY set
- [ ] OpenAI account has API quota available

## Environment Configuration

### Development (.env.local)
```
VITE_API_URL=http://localhost:5000/api
VITE_ENABLE_AI=true
```

### Production (.env.production)
```
VITE_API_URL=https://api.yourdomain.com/api
VITE_ENABLE_AI=true
```

## Performance Tips

1. **Debounce Suggestions**
   - Don't call AI on every keystroke
   - Wait until user pauses for 500ms
   - Use react-use-debounce hook

2. **Cache Results**
   - Store suggestions in localStorage
   - Reuse for similar inputs
   - Clear cache on logout

3. **Error Recovery**
   - Show offline fallback UI
   - Allow manual entry if AI fails
   - Retry failed requests

4. **Batch Operations**
   - Send multiple contacts at once
   - Process bulk campaigns asynchronously
   - Show progress indicators

## Security Reminders

✅ DO:
- Store API key in backend .env only
- Validate user input on backend
- Use HTTPS in production
- Implement rate limiting
- Log non-sensitive data only
- Check user permissions

❌ DON'T:
- Expose API key in frontend code
- Send PII without consent
- Cache sensitive responses
- Skip input validation
- Log personal data
- Trust client-side validation alone

## Next Steps

1. **Test API Integration**
   - Call each endpoint manually
   - Verify response formats
   - Check error handling

2. **Integrate with UI**
   - Add components to pages
   - Wire up event handlers
   - Test user workflows

3. **Monitor Usage**
   - Track API call patterns
   - Monitor error rates
   - Adjust rate limits as needed

4. **Gather Feedback**
   - Survey users on suggestions quality
   - Track which suggestions are selected
   - Improve prompts over time

## Support

- **Issue:** API returning 401 errors
  - Check OPENAI_API_KEY is correct
  - Verify key hasn't expired
  - Ensure backend .env is loaded

- **Issue:** Suggestions are low quality
  - Adjust temperature in prompts
  - Provide more context in prompts
  - Try different model (gpt-4 vs gpt-3.5-turbo)

- **Issue:** Requests timing out
  - Increase timeout setting
  - Check OpenAI API status
  - Use streaming for large responses

---

**Ready to add AI to your CRM?** Start with one component and expand from there!
