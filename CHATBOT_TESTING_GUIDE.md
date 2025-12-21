# 🚀 CHATBOT QUICK START - TESTING GUIDE

## Run the Application

```bash
cd crm-frontend
npm run dev
```

The app will start on `http://localhost:5173` (or similar)

## Test the Chatbot

### 1. **On Landing Page**
- Scroll to bottom-right corner
- Look for floating button with message icon 💬
- Click it to open chatbot

### 2. **In Main App**
- Navigate to any page (Dashboard, Contacts, Campaigns, etc.)
- Bottom-right corner will show chat button
- Click to open chatbot

### 3. **Send Test Messages**

**Quick Actions (First Message):**
- Click any of: "Get free training", "Get started free", "Book a demo", "Chat with sales"
- Bot will process and respond

**Manual Messages:**
1. Type: `Hello`
   - Expected: Natural greeting response

2. Type: `Help me manage customer contacts`
   - Expected: Helpful advice about contact management

3. Type: `What are the best practices for email campaigns?`
   - Expected: Detailed answer about email best practices

4. Type: `How do I improve my conversion rates?`
   - Expected: CRM/business advice from AI

### 4. **Test Error Handling**
- Delete the API key from `.env` file (or change it to invalid)
- Send a message
- Should see red error message

## Expected Behavior

### ✅ Success Response:
- Message appears in gray bubble on left side
- No delay spinner (responds within 2-3 seconds typically)
- Text appears in normal gray message box
- Quick actions disappear after first interaction

### ✅ Error Response (Red):
- Shows as red background message
- Error text explains what went wrong
- Usually includes helpful suggestion for next step

### 🔄 Loading State:
- Typing indicator (3 bouncing dots) appears while waiting
- Input is still active, can type next message
- Disable button grayed out while waiting

## Troubleshooting

### Issue: Chatbot shows "Failed to get response"
**Solutions:**
1. Check `.env` file exists: `crm-frontend/.env`
2. Verify API key is correct (shouldn't be modified)
3. Check internet connection
4. Check browser console (F12 → Console tab) for errors

### Issue: Chatbot button doesn't appear
**Solutions:**
1. Check if page fully loaded
2. Scroll to bottom-right corner (might be out of view)
3. Check browser console for JavaScript errors
4. Refresh the page

### Issue: Very slow responses
**Solutions:**
1. OpenRouter API is free but shared - may be slow at peak times
2. Check internet connection speed
3. Check browser Network tab (F12) to see request time

### Issue: Always getting same response
**Solutions:**
1. This shouldn't happen - each response should be different
2. Check API key in `.env` is correct
3. Try refreshing the page

## API Status Check

To verify the API key works:

1. Open your browser console (F12)
2. Paste this code:
```javascript
const apiKey = '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';
fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-r1:free',
    messages: [{ role: 'user', content: 'Test' }]
  })
}).then(r => r.json()).then(console.log);
```
3. If you see a response with `choices[0].message.content`, API key is working
4. If you see error, there's an API issue

## File Structure

```
crm-frontend/
├── .env                           ← API KEY (secret, don't share)
├── .env.example                   ← Template (safe to share)
├── src/
│   ├── components/
│   │   ├── ChatBotBadge.jsx      ← Floating button
│   │   ├── ChatWindow.jsx        ← Chat interface
│   │   └── Avatar.jsx            ← Chat avatar
│   └── utils/
│       └── sendMessage.js        ← API integration (NOW REAL!)
└── ...
```

## Key Components

### ChatBotBadge.jsx
- Shows floating button in bottom-right
- Manages open/close state
- Renders ChatWindow when opened

### ChatWindow.jsx  
- Displays messages in conversation format
- Handles user input
- Calls `sendMessage()` for API interaction
- Shows typing indicator while waiting
- Displays error messages in red

### sendMessage.js (UPDATED)
- Makes actual API call to OpenRouter
- Uses API key from `.env`
- Handles errors gracefully
- Returns formatted response

## Performance Tips

1. **First Load:** Takes 2-3 seconds to get first response (API cold start)
2. **Subsequent Messages:** Faster (usually <2 seconds)
3. **Network:** Uses about 1-2KB per message
4. **Browser:** Chat history stored in React state (cleared on refresh)

## Production vs Development

**Currently:** Development mode
- API key in `.env` (for this project only)
- Direct API calls from frontend
- Good for testing

**For Production:** 
- Backend proxy recommended
- API key on server only
- Frontend calls `/api/chat` endpoint
- More secure, better rate limiting

---

**Questions?** Check the main documentation in `CHATBOT_API_INTEGRATION_COMPLETE.md`
