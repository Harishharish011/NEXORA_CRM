# STEP 4.1 - Backend Quick Start Guide

## ✨ What Was Created

A complete Node.js/Express backend with:
- ✅ User authentication (signup/login)
- ✅ JWT token management
- ✅ Password hashing with bcrypt
- ✅ MongoDB integration with Mongoose
- ✅ Onboarding workflow
- ✅ Protected API routes

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create .env File
```bash
cp .env.example .env
```

Edit `.env` and update if needed:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/nexora-crm
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRY=7d
BCRYPT_ROUNDS=10
FRONTEND_URL=http://localhost:5173
```

### Step 4: Start MongoDB (if local)
```bash
mongod
```

### Step 5: Start Backend Server
```bash
npm run dev
```

Expected output:
```
==================================================
✅ Server running in development mode
✅ Server running on port 5000
✅ MongoDB connected
==================================================
```

---

## 🔌 API Endpoints

### 1. Signup
```bash
POST http://localhost:5000/api/auth/signup

Body:
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 2. Login
```bash
POST http://localhost:5000/api/auth/login

Body:
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 3. Complete Onboarding
```bash
POST http://localhost:5000/api/auth/onboarding

Headers:
Authorization: Bearer <your-jwt-token>

Body:
{
  "industry": "Technology",
  "role": "Marketing Manager",
  "companyName": "Acme Corp",
  "companyUrl": "https://acme.com"
}
```

### 4. Health Check
```bash
GET http://localhost:5000/health
```

---

## 📂 Backend Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── env.js             # Environment loader
│   ├── models/
│   │   └── User.model.js      # User schema
│   ├── controllers/
│   │   └── auth.controller.js # Auth logic
│   ├── routes/
│   │   └── auth.routes.js     # Auth endpoints
│   ├── middlewares/
│   │   └── auth.middleware.js # JWT verification
│   ├── utils/
│   │   ├── token.js           # JWT helpers
│   │   └── password.js        # Password helpers
│   ├── app.js                 # Express setup
│   └── server.js              # Server entry
├── .env.example               # Env template
├── package.json               # Dependencies
└── README.md                  # Full documentation
```

---

## 🔐 Authentication Flow

```
1. User signs up
   → POST /api/auth/signup
   → Receives JWT token
   → onboardingCompleted = false

2. Frontend checks onboarding status
   → If false: Redirect to onboarding page
   → If true: Redirect to dashboard

3. User completes onboarding
   → POST /api/auth/onboarding (with JWT)
   → User profile updated
   → onboardingCompleted = true

4. Next login
   → onboardingCompleted = true
   → Direct to dashboard
```

---

## 🧪 Test with Postman/Insomnia

1. **Signup Request:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/signup`
   - Body (JSON):
   ```json
   {
     "email": "test@example.com",
     "password": "test123"
   }
   ```
   - Copy the `token` from response

2. **Complete Onboarding:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/onboarding`
   - Headers: `Authorization: Bearer <paste-token-here>`
   - Body (JSON):
   ```json
   {
     "industry": "Tech",
     "role": "Manager",
     "companyName": "MyCompany",
     "companyUrl": "https://mycompany.com"
   }
   ```

3. **Login Request:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body (JSON):
   ```json
   {
     "email": "test@example.com",
     "password": "test123"
   }
   ```

---

## 📋 Key Features

| Feature | Status |
|---------|--------|
| User Registration | ✅ |
| User Login | ✅ |
| Password Hashing | ✅ |
| JWT Tokens | ✅ |
| Onboarding Flow | ✅ |
| Protected Routes | ✅ |
| MongoDB Integration | ✅ |
| Error Handling | ✅ |
| CORS Enabled | ✅ |
| Environment Config | ✅ |

---

## ⚙️ Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | App environment | `development` |
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection | `mongodb://localhost:27017/nexora-crm` |
| `JWT_SECRET` | Token signing key | Long random string |
| `JWT_EXPIRY` | Token expiration | `7d` |
| `BCRYPT_ROUNDS` | Password hash rounds | `10` |
| `FRONTEND_URL` | Frontend address for CORS | `http://localhost:5173` |

---

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Run in development (auto-reload)
npm run dev

# Run in production
npm start

# Install single package
npm install package-name

# Check installed packages
npm list
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in .env file
- Verify MongoDB is on port 27017

### Port Already in Use
- Change PORT in .env file
- Or kill process: `npx kill-port 5000`

### JWT Token Issues
- Ensure JWT_SECRET is set in .env
- Check Authorization header format: `Bearer <token>`
- Verify token hasn't expired

### CORS Errors
- Update FRONTEND_URL in .env
- Ensure it matches your frontend URL

---

## 📚 Next Steps

After verifying the backend works:

1. ✅ Backend running on port 5000
2. ✅ MongoDB connected
3. 🔜 Test APIs with Postman/Insomnia
4. 🔜 Connect frontend to backend
5. 🔜 Implement Step 4.2 (Contacts)

---

## 📖 Full Documentation

See [backend/README.md](backend/README.md) for complete API documentation and examples.

---

**Status:** ✅ Ready to use  
**Version:** Step 4.1  
**Last Updated:** December 19, 2025
