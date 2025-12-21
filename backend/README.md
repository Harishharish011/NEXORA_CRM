# NEXORA CRM Backend - Step 4.1

A production-ready authentication and onboarding API for the NEXORA CRM application built with Node.js, Express.js, MongoDB, and JWT.

## 🎯 Features

- ✅ User signup with email and password
- ✅ User login with JWT authentication
- ✅ Complete onboarding with company details
- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication middleware
- ✅ MongoDB integration with Mongoose
- ✅ CORS configuration for frontend communication
- ✅ Environment variable management
- ✅ Production-ready error handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory and copy from `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/nexora-crm
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRY=7d
BCRYPT_ROUNDS=10
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

Make sure MongoDB is running on your machine:

```bash
# For Windows (if installed as service)
# MongoDB should start automatically

# Or start MongoDB manually
mongod
```

### 4. Start the Backend Server

**Development Mode (with auto-reload):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

Server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection logic
│   │   └── env.js             # Environment variables loader
│   ├── models/
│   │   └── User.model.js      # User schema
│   ├── controllers/
│   │   └── auth.controller.js # Signup, login, onboarding logic
│   ├── routes/
│   │   └── auth.routes.js     # Auth API routes
│   ├── middlewares/
│   │   └── auth.middleware.js # JWT verification middleware
│   ├── utils/
│   │   ├── token.js           # JWT helpers
│   │   └── password.js        # Password hashing helpers
│   ├── app.js                 # Express app setup
│   └── server.js              # Server entry point
├── .env.example               # Sample environment variables
├── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication Routes

All authentication endpoints are prefixed with `/api/auth`

#### 1. Signup

**Endpoint:** `POST /api/auth/signup`

**Description:** Create a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "User created successfully.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "65a7c8d9e4b0a1b2c3d4e5f6",
      "email": "user@example.com",
      "onboardingCompleted": false
    }
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Email already registered. Please log in."
}
```

#### 2. Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "65a7c8d9e4b0a1b2c3d4e5f6",
      "email": "user@example.com",
      "onboardingCompleted": false
    }
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

#### 3. Complete Onboarding

**Endpoint:** `POST /api/auth/onboarding`

**Description:** Complete user onboarding (Protected route)

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "industry": "Technology",
  "role": "Marketing Manager",
  "companyName": "Acme Corporation",
  "companyUrl": "https://acme.com"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Onboarding completed successfully.",
  "data": {
    "user": {
      "id": "65a7c8d9e4b0a1b2c3d4e5f6",
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

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "No token provided. Please log in."
}
```

#### 4. Health Check

**Endpoint:** `GET /health`

**Description:** Check if server is running

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔄 Authentication Flow

```
1. User Signs Up
   POST /api/auth/signup
   → User created
   → JWT token issued
   → onboardingCompleted = false

2. User Logs In
   POST /api/auth/login
   → Check email & password
   → JWT token issued
   → Returns onboardingCompleted flag

3. Check Onboarding Status (Frontend)
   if (onboardingCompleted === false)
   → Redirect to onboarding page

4. User Completes Onboarding
   POST /api/auth/onboarding (with JWT token)
   → Update user profile
   → Set onboardingCompleted = true

5. Next Login
   POST /api/auth/login
   → Returns onboardingCompleted = true
   → Frontend redirects to dashboard
```

## 🛡️ Security Features

- **Password Hashing:** Bcrypt with configurable rounds (default: 10)
- **JWT Tokens:** Secure token-based authentication with expiration
- **CORS:** Cross-Origin Resource Sharing configured for frontend
- **Environment Variables:** Sensitive data stored in `.env` file
- **Input Validation:** Email and password validation on routes
- **Error Handling:** Comprehensive global error handling

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | development | Application environment |
| PORT | 5000 | Server port |
| MONGO_URI | mongodb://localhost:27017/nexora-crm | MongoDB connection string |
| JWT_SECRET | your-secret-key | Secret key for JWT signing |
| JWT_EXPIRY | 7d | JWT token expiration time |
| BCRYPT_ROUNDS | 10 | Bcrypt hashing rounds |
| FRONTEND_URL | http://localhost:5173 | Frontend URL for CORS |

## 📦 Dependencies

- **express:** Web framework for Node.js
- **mongoose:** MongoDB object modeling
- **jsonwebtoken:** JWT implementation
- **bcrypt:** Password hashing library
- **cors:** CORS middleware
- **dotenv:** Environment variable loader

## 🚦 Development Mode

With nodemon installed, the server automatically restarts on file changes:

```bash
npm run dev
```

## 📝 Notes

- All passwords are hashed using bcrypt before storage
- JWT tokens expire after the time specified in `JWT_EXPIRY`
- The authentication middleware validates tokens and attaches user info to requests
- MongoDB connection uses Mongoose for schema validation
- CORS is configured to allow requests from the frontend URL

## 🎯 Next Steps (Step 4.2)

After completing this authentication backend, the next step will be:

- Implement Contacts management backend
- Create contact CRUD operations
- Add contact association with users

## 📞 Support

For issues or questions about the backend setup, refer to the documentation in the main NEXORA-CRM repository.
