# AI Implementation - Environment Configuration Template

## Backend Configuration

Create `.env` file in `crm-backend/` directory with the following variables:

### OpenAI API Configuration
```
# OpenAI API Key - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-api-key-here

# Model Selection
# Options: gpt-4 (recommended), gpt-3.5-turbo (faster, cheaper)
OPENAI_MODEL=gpt-4

# Token Limits
# Maximum tokens per request
OPENAI_MAX_TOKENS=2000

# Temperature (0-2)
# 0.7 is good for balanced creativity and consistency
OPENAI_TEMPERATURE=0.7

# Timeout (milliseconds)
# How long to wait for OpenAI API response
OPENAI_TIMEOUT=30000
```

### Rate Limiting Configuration
```
# Enable/disable rate limiting
RATE_LIMIT_ENABLED=true

# Rate limit window (milliseconds)
RATE_LIMIT_WINDOW=60000  # 1 minute

# Maximum requests per window
RATE_LIMIT_MAX_REQUESTS=20

# Rate limit storage (redis or memory)
RATE_LIMIT_STORE=memory
```

### Logging Configuration
```
# AI Activity Logging
LOG_AI_REQUESTS=true
LOG_AI_RESPONSES=false  # Set to false to avoid logging sensitive data
LOG_LEVEL=info
```

### Additional Settings
```
# Enable AI features
AI_ENABLED=true

# Cache responses (hours)
AI_CACHE_DURATION=24

# Allowed domains (CORS)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## Frontend Configuration

Create `.env.local` or `.env.production` file in `crm-frontend/` directory:

### Development Configuration (.env.local)
```
# API Configuration
VITE_API_URL=http://localhost:5000/api

# AI Features
VITE_ENABLE_AI=true
VITE_AI_PROVIDER=openai

# Debug Mode
VITE_DEBUG_MODE=true
```

### Production Configuration (.env.production)
```
# API Configuration
VITE_API_URL=https://api.yourdomain.com/api

# AI Features
VITE_ENABLE_AI=true
VITE_AI_PROVIDER=openai

# Debug Mode
VITE_DEBUG_MODE=false
```

## Configuration Management

### Using dotenv-safe (Recommended)

Install in backend:
```bash
npm install dotenv-safe
```

Create `.env.example`:
```
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=20
AI_ENABLED=true
```

Load in `server.js`:
```javascript
require('dotenv-safe').config();
```

### Using dotenv

Install in backend:
```bash
npm install dotenv
```

Load in `server.js`:
```javascript
require('dotenv').config();
```

Load in frontend `vite.config.js`:
```javascript
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    }
  }
})
```

## Docker Environment Configuration

For containerized deployments, use environment variables:

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application
COPY . .

# Set environment from build args
ARG OPENAI_API_KEY
ARG OPENAI_MODEL=gpt-4
ARG NODE_ENV=production

ENV OPENAI_API_KEY=$OPENAI_API_KEY
ENV OPENAI_MODEL=$OPENAI_MODEL
ENV NODE_ENV=$NODE_ENV

EXPOSE 5000

CMD ["node", "server.js"]
```

Build with:
```bash
docker build \
  --build-arg OPENAI_API_KEY=sk-... \
  --build-arg OPENAI_MODEL=gpt-4 \
  -t crm-backend:1.0 .
```

## Environment Variables by Feature

### Email Suggestions
```
OPENAI_MODEL=gpt-4              # Required
OPENAI_MAX_TOKENS=2000          # Recommended
OPENAI_TEMPERATURE=0.7          # For balanced suggestions
```

### Campaign Analysis
```
OPENAI_MODEL=gpt-4              # Required
OPENAI_MAX_TOKENS=1500          # Recommended
OPENAI_TEMPERATURE=0.7          # For consistent analysis
```

### Analytics Insights
```
OPENAI_MODEL=gpt-4              # Required
OPENAI_MAX_TOKENS=1500          # Recommended
OPENAI_TEMPERATURE=0.7          # For reliable insights
```

### Outreach Messages
```
OPENAI_MODEL=gpt-4              # Required
OPENAI_MAX_TOKENS=2000          # For longer messages
OPENAI_TEMPERATURE=0.8          # For more creative variations
```

## Cost Optimization

### Model Selection
```
# Cost: Low, Speed: Fast, Quality: Good
OPENAI_MODEL=gpt-3.5-turbo

# Cost: High, Speed: Slower, Quality: Best
OPENAI_MODEL=gpt-4
```

### Token Limits
```
# Reduce tokens to save costs
OPENAI_MAX_TOKENS=1000          # Instead of 2000

# Limit requests
RATE_LIMIT_MAX_REQUESTS=10      # Instead of 20
```

### Caching
```
# Cache responses to reduce API calls
AI_CACHE_DURATION=48            # Cache for 48 hours
RATE_LIMIT_STORE=redis          # Use Redis for better caching
```

## Security Best Practices

### API Key Security
```bash
# Never commit .env files
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore

# Verify API key is not exposed
git log --all -p | grep -i "sk-" || echo "OK: No API keys found in history"
```

### Environment Variable Validation

```javascript
// config.js
function validateConfig() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required');
  }
  
  if (!process.env.OPENAI_MODEL) {
    throw new Error('OPENAI_MODEL is required');
  }
  
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.ALLOWED_ORIGINS) {
      throw new Error('ALLOWED_ORIGINS is required in production');
    }
  }
}

module.exports = {
  validateConfig,
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.OPENAI_MODEL,
  maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
};
```

## Monitoring Configuration

### Logging
```
LOG_AI_REQUESTS=true           # Log API requests
LOG_AI_RESPONSES=false         # Don't log full responses (privacy)
LOG_LEVEL=info                 # Log level: debug, info, warn, error
LOG_FORMAT=json                # JSON structured logging
```

### Analytics
```
ANALYTICS_ENABLED=true
ANALYTICS_PROVIDER=mixpanel
TRACK_AI_USAGE=true
TRACK_AI_COSTS=true
```

## Troubleshooting Configuration

### Issue: "Invalid API Key"
Check:
- [ ] OPENAI_API_KEY is set in .env
- [ ] Key starts with `sk-`
- [ ] Key is not expired
- [ ] No extra spaces in .env value

### Issue: "CORS Error"
Set:
```
ALLOWED_ORIGINS=http://localhost:5173
ALLOWED_ORIGINS=https://yourdomain.com
```

### Issue: "Timeout Error"
Increase:
```
OPENAI_TIMEOUT=60000           # 60 seconds
```

### Issue: "Rate Limit Exceeded"
Adjust:
```
RATE_LIMIT_MAX_REQUESTS=5      # Reduce requests
RATE_LIMIT_WINDOW=120000       # Increase window to 2 minutes
```

---

**Configuration Template Version:** 1.0  
**Last Updated:** 2024  
**Compatible With:** OpenAI API v1.0+
