# Deployment Guide 🚀

## Quick Deploy to Railway

### Prerequisites
- GitHub account
- Railway account (free tier available)

### Steps

1. **Fork/Clone the Repository**
```bash
git clone https://github.com/Aurenya-19/codemaster-learning-platform.git
cd codemaster-learning-platform
```

2. **Deploy to Railway**

#### Option A: Using Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

#### Option B: Using Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `codemaster-learning-platform`
5. Railway will auto-detect and deploy

3. **Set Environment Variables in Railway**
```
PORT=5000
NODE_ENV=production
JWT_SECRET=your-production-secret-key
EXECUTION_TIMEOUT=5000
PYTHON_PATH=/usr/bin/python3
GCC_PATH=/usr/bin/g++
```

4. **Access Your App**
- Backend: `https://your-app.railway.app`
- Frontend: Deploy separately on Vercel/Netlify

## Deploy Frontend to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd client
vercel
```

3. **Set Environment Variable**
```
VITE_API_URL=https://your-backend.railway.app
```

## Local Development

### Backend
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start server
npm run server
```

### Frontend
```bash
# Navigate to client
cd client

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Docker Deployment (Optional)

```bash
# Build image
docker build -t codemaster .

# Run container
docker run -p 5000:5000 --env-file .env codemaster
```

## Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Configure CORS properly
- [ ] Set up PostgreSQL database
- [ ] Enable HTTPS
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure rate limiting
- [ ] Set up CI/CD pipeline
- [ ] Add error tracking
- [ ] Configure backups

## Troubleshooting

### Code Execution Not Working
- Ensure Python3 and G++ are installed on server
- Check file permissions for temp directory
- Verify EXECUTION_TIMEOUT is set

### Database Connection Issues
- Verify DATABASE_URL format
- Check network connectivity
- Ensure PostgreSQL is running

### CORS Errors
- Add frontend URL to ALLOWED_ORIGINS
- Check proxy configuration in vite.config.js

## Support

For deployment issues, create an issue on GitHub or contact support.
