# 📊 STEP 4.4 - QUICK START

**Analytics API Quick Reference**

---

## ⚡ Get Started in 2 Minutes

### 1. Dashboard Summary (All Key Metrics)

```bash
curl -X GET http://localhost:5000/api/analytics/summary \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Returns:**
```json
{
  "totalContacts": 150,
  "totalCampaigns": 24,
  "activeCampaigns": 3,
  "completedCampaigns": 12,
  "draftCampaigns": 9,
  "templatesCount": 7
}
```

**Use in UI:** Display on dashboard hero section

---

### 2. Campaign Status Breakdown

```bash
curl -X GET http://localhost:5000/api/analytics/campaign-status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Returns:**
```json
{
  "draft": 9,
  "scheduled": 2,
  "running": 1,
  "paused": 0,
  "completed": 12,
  "cancelled": 0
}
```

**Use in UI:** Render as pie/donut chart or bar chart

---

### 3. Recent Activity (Activity Feed)

```bash
curl -X GET "http://localhost:5000/api/analytics/recent-activity?limit=5" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Returns:**
```json
{
  "recentContacts": [
    {
      "id": "...",
      "type": "contact",
      "title": "John Doe",
      "description": "john@example.com",
      "status": "prospect",
      "timestamp": "2025-12-19T10:15:00.000Z"
    }
  ],
  "recentCampaigns": [
    {
      "id": "...",
      "type": "campaign",
      "title": "Holiday Sale",
      "description": "email campaign",
      "status": "running",
      "sent": 500,
      "timestamp": "2025-12-19T10:10:00.000Z"
    }
  ]
}
```

**Use in UI:** Display as timeline/feed

---

## 📡 ALL ENDPOINTS

| Endpoint | Purpose | Best For |
|----------|---------|----------|
| `/api/analytics/summary` | Key metrics | KPI cards |
| `/api/analytics/campaign-status` | Status breakdown | Pie chart |
| `/api/analytics/campaign-types` | Channel breakdown | Bar chart |
| `/api/analytics/contact-statistics` | Contact funnel | Funnel chart |
| `/api/analytics/campaign-performance` | Performance metrics | KPI cards |
| `/api/analytics/recent-activity` | Activity feed | Timeline |
| `/api/analytics/monthly-activity` | Trends | Line chart |
| `/api/analytics/top-campaigns` | Best performers | Leaderboard |
| `/api/analytics/overview` | Everything at once | Single fetch |

---

## 🎯 Common Dashboard Patterns

### Pattern 1: Dashboard Summary Card
```bash
# Fetch summary
curl http://localhost:5000/api/analytics/summary \
  -H "Authorization: Bearer TOKEN"

# Display:
# ┌─────────────────┐
# │  150 Contacts   │
# │   24 Campaigns  │
# │   3 Active      │
# └─────────────────┘
```

### Pattern 2: Status Breakdown Chart
```bash
# Fetch status
curl http://localhost:5000/api/analytics/campaign-status \
  -H "Authorization: Bearer TOKEN"

# Render as pie chart:
# Draft (9), Scheduled (2), Running (1), etc.
```

### Pattern 3: Activity Timeline
```bash
# Fetch recent
curl http://localhost:5000/api/analytics/recent-activity \
  -H "Authorization: Bearer TOKEN"

# Display timeline:
# ▸ John Doe added - john@example.com
# ▸ Holiday Sale launched - Email campaign
# ▸ Q4 Sale created - Draft
```

### Pattern 4: Performance Cards
```bash
# Fetch performance
curl http://localhost:5000/api/analytics/campaign-performance \
  -H "Authorization: Bearer TOKEN"

# Display cards:
# Open Rate: 25% | Click Rate: 6% | Response: 1.2%
```

---

## 💡 Frontend Integration Example

```javascript
// React hook for fetching analytics
async function useAnalytics() {
  const [summary, setSummary] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch summary
    fetch('/api/analytics/summary', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(data => setSummary(data.data));
  }, [token]);

  return summary;
}

// Use in component
function Dashboard() {
  const analytics = useAnalytics();
  
  return (
    <div>
      <h2>{analytics?.totalContacts} Contacts</h2>
      <h2>{analytics?.totalCampaigns} Campaigns</h2>
      <h2>{analytics?.activeCampaigns} Active</h2>
    </div>
  );
}
```

---

## 🔧 Query Parameters

### Limit Parameter
Most endpoints support `?limit=N`:

```bash
# Get 10 items instead of 5
curl http://localhost:5000/api/analytics/recent-activity?limit=10 \
  -H "Authorization: Bearer TOKEN"

# Get top 10 campaigns
curl "http://localhost:5000/api/analytics/top-campaigns?limit=10" \
  -H "Authorization: Bearer TOKEN"
```

**Limit ranges:**
- Minimum: 1
- Maximum: 20 (enforced)
- Default: 5

---

## ✅ Testing Checklist

Test these endpoints after setting up:

- [ ] `/api/analytics/summary` - Returns all metrics
- [ ] `/api/analytics/campaign-status` - Returns status breakdown
- [ ] `/api/analytics/campaign-types` - Returns type counts
- [ ] `/api/analytics/contact-statistics` - Returns contact status
- [ ] `/api/analytics/campaign-performance` - Returns performance metrics
- [ ] `/api/analytics/recent-activity` - Returns recent items
- [ ] `/api/analytics/monthly-activity` - Returns monthly data
- [ ] `/api/analytics/top-campaigns` - Returns top performers
- [ ] `/api/analytics/overview` - Returns combined data

---

## 🐛 Troubleshooting

### Error: "Invalid or expired token"
```bash
# Get a new token first
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password"
  }'

# Use the token in responses
```

### Error: "No data returned"
```
This is OK! It means:
- No contacts created yet
- No campaigns created yet
- These will populate as you add data
```

### All metrics showing 0
```
This is expected for new users.
Add some contacts and campaigns first:
1. POST /api/contacts
2. POST /api/campaigns
3. Create data via UI
4. Then analytics will show real numbers
```

---

## 📊 Example Dashboard Layout

```
┌──────────────────────────────────┐
│         DASHBOARD SUMMARY        │
├──────────────┬──────────────────┤
│ 150 Contacts │ 24 Campaigns     │
│ 3 Active     │ 12 Completed     │
└──────────────┴──────────────────┘

┌──────────────────────────────────┐
│  CAMPAIGN STATUS (Pie Chart)     │
│  Draft: 9 | Scheduled: 2         │
│  Running: 1 | Completed: 12      │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│  PERFORMANCE METRICS             │
│  Open Rate: 25% | Click: 6%      │
│  Response: 1.2% | Sent: 12.5k    │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│  RECENT ACTIVITY                 │
│  ▸ John Doe added                │
│  ▸ Holiday Sale launched          │
│  ▸ Q4 Campaign created            │
└──────────────────────────────────┘
```

---

## 🚀 Production Ready

✅ All endpoints tested
✅ User-scoped queries
✅ Error handling included
✅ JWT protected
✅ Efficient aggregation
✅ Ready for frontend connection

---

**For detailed API reference, see:** [STEP_4_4_ANALYTICS_COMPLETE.md](STEP_4_4_ANALYTICS_COMPLETE.md)
