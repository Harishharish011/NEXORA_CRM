# NEXORA CRM - Refactored Architecture

A complete CRM platform with **separated frontend and backend** architectures.

## Project Structure

```
NEXORA-CRM/
│
├── crm-frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Avatar.jsx
│   │   │   ├── ChatBotBadge.jsx
│   │   │   └── ChatWindow.jsx
│   │   ├── assets/              # Images, fonts, media
│   │   ├── pages/               # Page components (ready for routing)
│   │   ├── routes/              # Route configuration
│   │   ├── data/                # Static data, constants
│   │   ├── utils/               # Utility functions (sendMessage, etc.)
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   │
│   ├── public/                  # Static files
│   ├── index.html               # HTML template
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── postcss.config.js        # PostCSS config
│   └── README.md                # Frontend documentation
│
├── crm-backend/
│   ├── src/
│   │   ├── config/              # Configuration (DB, env, constants)
│   │   ├── routes/              # API route definitions
│   │   ├── controllers/         # Request handlers & business logic
│   │   └── services/            # Service layer (data operations)
│   │
│   ├── server.js                # Server entry point
│   ├── package.json             # Backend dependencies
│   ├── README.md                # Backend documentation
│   └── .env.example             # Environment template
│
└── README.md                    # Root documentation
```

## Frontend (crm-frontend)

**React + Vite + Tailwind CSS**

### Features:
- Landing page with Spline 3D integration
- AI-powered chatbot (NEXBOT)
- Responsive design with Framer Motion animations
- Modern UI components

### Getting Started:
```bash
cd crm-frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

### Technologies:
- React 18.2
- Vite 4.5
- Tailwind CSS 3.3
- Framer Motion 10.16
- Spline for 3D

---

## Backend (crm-backend)

**Node.js - Scaffold Ready**

### Structure:
```
/config    - Environment & database configuration
/routes    - API endpoint definitions
/controllers - Business logic handlers
/services  - Data operations & business rules
```

### Getting Started:
```bash
cd crm-backend
npm install
npm start
```

### Next Steps:
1. Choose framework: Express, Fastify, or other
2. Setup database connection
3. Implement authentication
4. Create API routes and controllers
5. Build service layer

---

## Key Principles

✅ **Clear Separation** - Frontend and backend are completely independent
✅ **Expandable** - Easy to add new features without affecting the other
✅ **Scalable** - Backend scaffold ready for microservices
✅ **No Merge** - Frontend code stays frontend, backend stays backend
✅ **Explicit** - All files are readable and clearly placed

---

## Important Notes

### Frontend:
- ⚠️ `sendMessage.js` is a stub - needs real API integration when backend is ready
- All navigation links are placeholder (`href="#"`)
- Ready for React Router integration

### Backend:
- 🚧 Scaffold only - no business logic implemented
- 📋 Configuration files need setup
- 🔌 Database connection pending
- 🛡️ Authentication implementation required

---

## Next Phases

### Phase 1: Backend Setup (Current)
- [ ] Choose web framework
- [ ] Setup database (MongoDB, PostgreSQL, etc.)
- [ ] Create API endpoints

### Phase 2: Frontend Integration
- [ ] Connect sendMessage to real API
- [ ] Setup React Router
- [ ] Implement authentication flow

### Phase 3: Features
- [ ] User authentication
- [ ] Contact management
- [ ] Deal tracking
- [ ] Task management
- [ ] AI chatbot integration

---

## Development Workflow

**Frontend Development:**
```bash
cd crm-frontend
npm run dev
```

**Backend Development:**
```bash
cd crm-backend
npm run dev  # After installing nodemon and framework
```

---

## Deployment

- **Frontend**: Deploy to Vercel, Netlify, or static hosting
- **Backend**: Deploy to Heroku, AWS, GCP, or your preferred platform

---

## Architecture Benefits

1. **Independent Scaling** - Scale frontend and backend separately
2. **Technology Flexibility** - Swap technologies without affecting both sides
3. **Team Separation** - Frontend and backend teams can work independently
4. **Easier Testing** - Test frontend and backend in isolation
5. **Clear Responsibilities** - Each layer has defined boundaries

---

**Created**: December 16, 2025
**Status**: ✅ Refactoring Complete
