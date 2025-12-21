# 🚀 STEP 4.1 - QUICK REFERENCE CARD

---

## ⚡ INSTANT SETUP (Copy & Paste)

```bash
# 1. Go to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start server (development)
npm run dev

# Server will start on http://localhost:5000
```

---

## 📡 API ENDPOINTS

### 1️⃣ SIGNUP
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "userId",
      "email": "user@example.com",
      "onboardingCompleted": false
    }
  }
}
```

---

### 2️⃣ LOGIN
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "userId",
      "email": "user@example.com",
      "onboardingCompleted": false
    }
  }
}
```

---

### 3️⃣ COMPLETE ONBOARDING (Protected)
```bash
curl -X POST http://localhost:5000/api/auth/onboarding \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "industry": "Technology",
    "role": "Marketing Manager",
    "companyName": "Acme Corporation",
    "companyUrl": "https://acme.com"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Onboarding completed successfully.",
  "data": {
    "user": {
      "id": "userId",
      "email": "user@example.com",
      "industry": "Technology",
      "role": "Marketing Manager",
      "companyName": "Acme Corporation",
      "companyUrl": "https://acme.com",
      "onboardingCompleted": true
    }
  }
}
```

---

### 4️⃣ HEALTH CHECK
```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🔑 ENVIRONMENT VARIABLES

Create `.env` file with these values:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/nexora-crm
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRY=7d
BCRYPT_ROUNDS=10
FRONTEND_URL=http://localhost:5173
```

---

## 📂 BACKEND DIRECTORY

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js          ← MongoDB connection
│   │   └── env.js         ← Environment config
│   ├── models/
│   │   └── User.model.js  ← User schema
│   ├── controllers/
│   │   └── auth.controller.js ← Auth logic
│   ├── routes/
│   │   └── auth.routes.js ← API routes
│   ├── middlewares/
│   │   └── auth.middleware.js ← JWT verification
│   ├── utils/
│   │   ├── token.js       ← JWT helpers
│   │   └── password.js    ← Password helpers
│   ├── app.js             ← Express setup
│   └── server.js          ← Server entry
├── package.json
├── .env.example
└── README.md
```

---

## 📦 DEPENDENCIES

```json
{
  "express": "^4.18.2",          // Web framework
  "mongoose": "^7.5.0",          // MongoDB
  "jsonwebtoken": "^9.0.2",      // JWT tokens
  "bcrypt": "^5.1.0",            // Password hashing
  "cors": "^2.8.5",              // CORS setup
  "dotenv": "^16.3.1"            // Environment vars
}
```

---

## 🎯 WORKFLOW

```
1. User Signup
   POST /api/auth/signup
   → Get JWT token
   → onboardingCompleted = false

2. Frontend Check
   if (onboardingCompleted === false)
   → Show onboarding page

3. Complete Onboarding
   POST /api/auth/onboarding (with JWT)
   → Update profile
   → onboardingCompleted = true

4. Next Login
   POST /api/auth/login
   → onboardingCompleted = true
   → Go to dashboard
```

---

## ⚙️ NPM SCRIPTS

```bash
# Development (auto-reload)
npm run dev

# Production
npm start

# Install packages
npm install

# Check installed packages
npm list --depth=0
```

---

## 🔒 SECURITY FEATURES

| Feature | Details |
|---------|---------|
| Password | Bcrypt hashing (10 rounds) |
| Tokens | JWT with 7-day expiration |
| Validation | Email format + required fields |
| CORS | Configured for frontend |
| Secrets | All in .env file |
| Errors | Safe messages (no data leak) |

---

## 🧪 QUICK TEST

### 1. Start MongoDB
```bash
mongod
```

### 2. Start Backend
```bash
cd backend && npm run dev
```

### 3. Test Signup (Terminal 2)
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 4. Copy Token and Test Onboarding
```bash
# Replace TOKEN with the token from signup response
curl -X POST http://localhost:5000/api/auth/onboarding \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"industry":"Tech","role":"Manager","companyName":"MyCompany","companyUrl":"https://mycompany.com"}'
```

---

## 🐛 TROUBLESHOOTING

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Check MONGO_URI in .env
# Default: mongodb://localhost:27017/nexora-crm
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000
```

### JWT Token Errors
```
Check Authorization header format:
Authorization: Bearer <token>

Token expires after 7 days
Generate new token with login
```

### CORS Errors
```
Update FRONTEND_URL in .env
Match your frontend URL exactly
```

---

## 📚 DOCUMENTATION

| Document | Purpose |
|----------|---------|
| [STEP_4_1_QUICK_START.md](STEP_4_1_QUICK_START.md) | Setup guide |
| [STEP_4_1_BACKEND_COMPLETE.md](STEP_4_1_BACKEND_COMPLETE.md) | Full overview |
| [STEP_4_1_VERIFICATION_COMPLETE.md](STEP_4_1_VERIFICATION_COMPLETE.md) | Technical docs |
| [STEP_4_1_INDEX.md](STEP_4_1_INDEX.md) | Navigation |
| [backend/README.md](backend/README.md) | API reference |

---

## ✅ CHECKLIST

Before moving to Step 4.2:

- [ ] Backend installed (`npm install` success)
- [ ] .env file created (copy from .env.example)
- [ ] MongoDB running (mongod)
- [ ] Backend server starts (`npm run dev`)
- [ ] Health check works (GET /health)
- [ ] Signup works (POST /api/auth/signup)
- [ ] Login works (POST /api/auth/login)
- [ ] Onboarding works (POST /api/auth/onboarding)
- [ ] JWT tokens validate
- [ ] Protected routes require JWT

---

## 🎯 KEY POINTS

✅ **Backend runs on:** http://localhost:5000  
✅ **Health check:** GET /health  
✅ **Protected routes:** Add `Authorization: Bearer <token>` header  
✅ **Database:** MongoDB on port 27017  
✅ **Config:** All in .env file  
✅ **Dev mode:** Auto-reload with nodemon  

---

## 📞 SUPPORT

### Getting Help
1. Check [STEP_4_1_QUICK_START.md](STEP_4_1_QUICK_START.md)
2. Review [backend/README.md](backend/README.md)
3. Check [STEP_4_1_VERIFICATION_COMPLETE.md](STEP_4_1_VERIFICATION_COMPLETE.md)

### Common Issues
- MongoDB connection → Start mongod
- Port in use → Kill port 5000
- JWT errors → Check token format
- CORS errors → Update FRONTEND_URL

---

## 🚀 NEXT STEPS

✅ Backend ready  
✅ Database integrated  
✅ Authentication working  

🔜 **Step 4.2:** Contacts Backend (coming next)

---

**Created:** December 19, 2025  
**Status:** ✅ Ready to use  
**Version:** Step 4.1 Complete
