# STEP 4.2 - Contacts Backend Quick Start

**Status:** ✅ COMPLETE  
**Phase:** Contacts Management CRUD

---

## 🚀 QUICK SETUP

No additional setup needed! The contacts module is already integrated into your existing backend.

### 1. Ensure Backend is Running
```bash
cd backend
npm run dev
```

### 2. Get JWT Token (From Step 4.1)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

Copy the returned `token` value.

---

## 📡 5 NEW API ENDPOINTS

### 1️⃣ Create Contact
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Acme Corp",
    "jobTitle": "Sales Manager",
    "status": "Lead",
    "tags": ["VIP", "Sales"]
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Contact created successfully.",
  "data": {
    "contact": {
      "_id": "...",
      "owner": "...",
      "firstName": "John",
      ...
    }
  }
}
```

---

### 2️⃣ Get All Contacts
```bash
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "message": "Contacts retrieved successfully.",
  "data": {
    "contacts": [...],
    "count": 5
  }
}
```

---

### 3️⃣ Get Single Contact
```bash
curl -X GET http://localhost:5000/api/contacts/CONTACT_ID \
  -H "Authorization: Bearer TOKEN_HERE"
```

Replace `CONTACT_ID` with actual ID.

---

### 4️⃣ Update Contact
```bash
curl -X PUT http://localhost:5000/api/contacts/CONTACT_ID \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Prospect",
    "jobTitle": "VP Sales"
  }'
```

Only update fields you want to change.

---

### 5️⃣ Delete Contact
```bash
curl -X DELETE http://localhost:5000/api/contacts/CONTACT_ID \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## 📝 CONTACT FIELDS

When creating/updating contacts, you can use:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| firstName | string | ✅ | Must be provided |
| lastName | string | ❌ | Optional |
| email | string | ❌ | Format validated |
| phone | string | ❌ | Any format |
| company | string | ❌ | Company name |
| jobTitle | string | ❌ | Job position |
| status | string | ❌ | Lead, Prospect, or Customer |
| tags | array | ❌ | Array of strings |

---

## 🔐 AUTHENTICATION

All contact endpoints require JWT token in header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Where `YOUR_JWT_TOKEN` is obtained from signup or login.

---

## ⚠️ AUTHORIZATION

**Important:** You can only:
- ✅ Create your own contacts
- ✅ View your own contacts
- ✅ Update your own contacts
- ✅ Delete your own contacts

Attempting to access another user's contacts will return:
```json
{
  "success": false,
  "message": "You do not have permission to access this contact."
}
```

---

## ✅ FILES CREATED/MODIFIED

### New Files
- ✅ `src/models/Contact.model.js`
- ✅ `src/controllers/contact.controller.js`
- ✅ `src/routes/contact.routes.js`

### Updated Files
- ✅ `src/app.js` (contact routes mounted)

---

## 🧪 TEST FLOW

### Step 1: Create Two Contacts
```bash
# Contact 1
curl -X POST http://localhost:5000/api/contacts \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Alice","email":"alice@example.com"}'

# Contact 2
curl -X POST http://localhost:5000/api/contacts \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Bob","email":"bob@example.com"}'
```

### Step 2: Get All Contacts
```bash
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer TOKEN"
```

You should see both contacts listed (newest first).

### Step 3: Get Single Contact
Copy a contact `_id` and run:
```bash
curl -X GET http://localhost:5000/api/contacts/CONTACT_ID \
  -H "Authorization: Bearer TOKEN"
```

### Step 4: Update Contact
```bash
curl -X PUT http://localhost:5000/api/contacts/CONTACT_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"Customer"}'
```

### Step 5: Delete Contact
```bash
curl -X DELETE http://localhost:5000/api/contacts/CONTACT_ID \
  -H "Authorization: Bearer TOKEN"
```

Verify it's gone by doing GET all contacts again.

---

## 🐛 TROUBLESHOOTING

### "No token provided"
Make sure you include the Authorization header:
```
-H "Authorization: Bearer YOUR_TOKEN"
```

### "You do not have permission"
Make sure you're using a valid token from your own login, not another user's.

### "Contact not found"
Make sure the contact ID is correct and you're using the right token.

### Invalid contact ID format
Contact IDs must be valid MongoDB ObjectIds (24 hex characters).

---

## 💡 TIPS

1. **Use Postman/Insomnia** for easier testing
2. **Save your token** in an environment variable
3. **Create several test contacts** before updating/deleting
4. **Try without Authorization header** to see 401 error
5. **Check status values**: Lead, Prospect, Customer

---

## 🔗 FRONTEND INTEGRATION

In your React/Vue/Angular app:

```javascript
// Create contact
async function createContact(token, contactData) {
  const response = await fetch('http://localhost:5000/api/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactData)
  });
  return response.json();
}

// Get all contacts
async function getContacts(token) {
  const response = await fetch('http://localhost:5000/api/contacts', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}
```

---

## 📊 CONTACT DATA STRUCTURE

When you create a contact, it looks like:

```json
{
  "_id": "65a7c8d9e4b0a1b2c3d4e5f6",
  "owner": "65a7c8d9e4b0a1b2c3d4e5f0",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "jobTitle": "Sales Manager",
  "status": "Lead",
  "tags": ["VIP", "Sales"],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

## ✨ KEY FEATURES

- ✅ Create, read, update, delete contacts
- ✅ User ownership tracking
- ✅ Sorted by date (newest first)
- ✅ Email validation
- ✅ Status management (Lead, Prospect, Customer)
- ✅ Tagging system
- ✅ Full error handling
- ✅ MongoDB indexed queries

---

## 🎯 NEXT STEP

Your backend is ready! Now:
1. ✅ Test with cURL/Postman
2. ✅ Connect your frontend
3. ✅ Implement contact UI with these APIs

---

**Status:** ✅ Ready to use  
**Version:** Step 4.2 Complete
