# 🚀 STEP 4.3 - QUICK START

**Get Started with Campaigns API in 5 Minutes**

---

## ⚡ Prerequisites

✅ Backend running: `cd backend && npm run dev`
✅ Valid JWT token from login
✅ Existing contacts in database

---

## 📝 Step 1: Create Campaign

```bash
curl -X POST http://localhost:5000/api/campaigns \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Black Friday Sale",
    "description": "Special Black Friday promotion",
    "type": "email",
    "subject": "Biggest Sale of the Year!",
    "content": "Don't miss our Black Friday deals...",
    "tags": ["sale", "blackfriday", "2025"]
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Campaign created successfully",
  "data": {
    "_id": "CAMPAIGN_ID",
    "owner": "USER_ID",
    "name": "Black Friday Sale",
    "type": "email",
    "status": "draft",
    "createdAt": "2025-12-19T10:00:00Z"
  }
}
```

💡 **Save the `_id` value as CAMPAIGN_ID for next steps**

---

## 📋 Step 2: List Your Campaigns

```bash
curl -X GET http://localhost:5000/api/campaigns \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**With Filters:**
```bash
# List only running campaigns
curl -X GET "http://localhost:5000/api/campaigns?status=running" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# List by type
curl -X GET "http://localhost:5000/api/campaigns?type=email&sortBy=oldest" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 👥 Step 3: Add Contacts to Campaign

First, get your contact IDs:
```bash
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Then add them to campaign:
```bash
curl -X POST http://localhost:5000/api/campaigns/CAMPAIGN_ID/add-contacts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "contactIds": [
      "CONTACT_ID_1",
      "CONTACT_ID_2",
      "CONTACT_ID_3"
    ]
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Added 3 contact(s) to campaign",
  "data": {
    "campaignId": "CAMPAIGN_ID",
    "totalContacts": 3
  }
}
```

---

## 🔧 Step 4: Update Campaign

```bash
curl -X PUT http://localhost:5000/api/campaigns/CAMPAIGN_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Black Friday - Final Hours!",
    "status": "scheduled",
    "budget": 5000,
    "scheduledDate": "2025-12-27T10:00:00Z"
  }'
```

---

## 🚀 Step 5: Launch Campaign

```bash
curl -X POST http://localhost:5000/api/campaigns/CAMPAIGN_ID/launch \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "message": "Campaign launched successfully",
  "data": {
    "campaignId": "CAMPAIGN_ID",
    "status": "running",
    "startDate": "2025-12-19T10:15:00Z",
    "totalSent": 3
  }
}
```

---

## 📊 Step 6: Check Metrics

```bash
curl -X GET http://localhost:5000/api/campaigns/CAMPAIGN_ID/metrics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "message": "Campaign metrics retrieved successfully",
  "data": {
    "campaignId": "CAMPAIGN_ID",
    "campaignName": "Black Friday Sale",
    "status": "running",
    "duration": 5,
    "metrics": {
      "totalSent": 3,
      "totalOpened": 0,
      "totalClicked": 0,
      "openRate": 0,
      "clickRate": 0,
      "responseRate": 0
    }
  }
}
```

---

## ⏸️ Step 7: Pause Campaign

```bash
curl -X POST http://localhost:5000/api/campaigns/CAMPAIGN_ID/pause \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🗑️ Step 8: Delete Campaign

```bash
curl -X DELETE http://localhost:5000/api/campaigns/CAMPAIGN_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🔑 Complete API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/campaigns` | Create campaign |
| GET | `/api/campaigns` | List campaigns |
| GET | `/api/campaigns/:id` | Get details |
| PUT | `/api/campaigns/:id` | Update campaign |
| DELETE | `/api/campaigns/:id` | Delete campaign |
| POST | `/api/campaigns/:id/add-contacts` | Add contacts |
| POST | `/api/campaigns/:id/launch` | Launch campaign |
| POST | `/api/campaigns/:id/pause` | Pause campaign |
| GET | `/api/campaigns/:id/metrics` | Get metrics |

---

## 💡 Tips & Tricks

### Get JWT Token
```bash
# Login first
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "your_password"
  }'

# Use the token from response in Authorization header
```

### Campaign Workflow
1. Create campaign (status: draft)
2. Add contacts (0 → n contacts)
3. Update content (finalize message)
4. Launch campaign (status: running)
5. Monitor metrics (real-time rates)
6. Pause when done (status: paused)

### Status Types
- **draft** - Initial state, can edit freely
- **scheduled** - Scheduled for future, waiting launch
- **running** - Currently sending messages
- **paused** - Temporarily stopped, can resume
- **completed** - Finished successfully
- **cancelled** - Manually cancelled

### Query Parameters
```bash
# Filter by status
?status=running
?status=draft
?status=completed

# Filter by type
?type=email
?type=sms
?type=social

# Sort options
?sortBy=newest  (default)
?sortBy=oldest
```

---

## ❌ Common Errors & Solutions

### Error: Invalid JWT Token
```
"message": "Invalid or expired token"
```
**Solution:** Get a new token via login endpoint

### Error: Campaign Not Found
```
"message": "Campaign not found"
```
**Solution:** Verify campaign ID exists, use GET /api/campaigns to list

### Error: Unauthorized Access
```
"message": "You do not have permission to access this campaign"
```
**Solution:** Make sure you're accessing your own campaigns

### Error: Cannot Delete Running Campaign
```
"message": "Cannot delete a running campaign. Pause it first."
```
**Solution:** Call PAUSE endpoint before DELETE

### Error: No Target Contacts
```
"message": "Cannot launch campaign without target contacts"
```
**Solution:** Add contacts using `/api/campaigns/:id/add-contacts`

---

## 🎯 Advanced Usage

### Update Campaign Status
```bash
curl -X PUT http://localhost:5000/api/campaigns/CAMPAIGN_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Filter by Multiple Criteria
```bash
# Get all email campaigns that are running
curl -X GET "http://localhost:5000/api/campaigns?type=email&status=running" \
  -H "Authorization: Bearer TOKEN"
```

### Batch Update
```bash
# Update multiple campaigns one by one
for campaign in CAMPAIGN_ID_1 CAMPAIGN_ID_2; do
  curl -X PUT http://localhost:5000/api/campaigns/$campaign \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"tags": ["winter2025"]}'
done
```

---

## ✅ Testing Checklist

- [ ] Create campaign successfully
- [ ] List campaigns returns your campaign
- [ ] Add 3+ contacts to campaign
- [ ] Update campaign details
- [ ] Get campaign details with full data
- [ ] Launch campaign (status becomes running)
- [ ] Check metrics (totalSent matches contact count)
- [ ] Pause campaign
- [ ] Get campaign metrics
- [ ] Delete campaign (after pausing)

---

**Ready to integrate with frontend?** 
See [STEP_4_3_CAMPAIGNS_COMPLETE.md](STEP_4_3_CAMPAIGNS_COMPLETE.md) for detailed API documentation.
