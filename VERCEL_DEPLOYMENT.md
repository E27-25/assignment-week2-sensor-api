# 🚀 Vercel Deployment Guide

Your code is now on GitHub! Let's deploy to Vercel.

## 📋 Step-by-Step Deployment

### 1️⃣ Get a PostgreSQL Database (REQUIRED)

Before deploying, you need a PostgreSQL database. Choose one:

#### Option A: Neon (Recommended - Free)
1. Go to https://neon.tech
2. Sign up with GitHub
3. Create a new project
4. Copy the connection string (starts with `postgresql://`)

#### Option B: Vercel Postgres
1. Go to https://vercel.com
2. Navigate to Storage tab
3. Create Database → Select Postgres
4. Copy the connection string

---

### 2️⃣ Deploy API to Vercel

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `E27-25/assignment-week2-sensor-api`
4. Configure the project:

   **Project Settings:**
   ```
   Framework Preset: Other
   Root Directory: api
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Add Environment Variables:**
   ```
   DATABASE_URL = your_postgresql_connection_string_here
   API_SECRET = your_secret_key_change_this
   ```

6. Click **Deploy**

7. **IMPORTANT:** After deployment, copy your API URL (e.g., `https://your-api.vercel.app`)

---

### 3️⃣ Deploy Webapp to Vercel

1. In Vercel Dashboard, click "Add New..." → "Project"
2. Select the **same** GitHub repository
3. Configure the project:

   **Project Settings:**
   ```
   Framework Preset: Vite
   Root Directory: webapp
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables:**
   ```
   VITE_API_URL = https://your-api.vercel.app/api/v1
   VITE_API_SECRET = your_secret_key_change_this
   ```
   
   ⚠️ **IMPORTANT:** Replace `https://your-api.vercel.app` with your actual API URL from step 2

5. Click **Deploy**

---

### 4️⃣ Update CORS (IMPORTANT!)

After deploying the webapp, you need to update the API to allow requests from your webapp domain.

1. Copy your webapp URL (e.g., `https://your-webapp.vercel.app`)

2. In your local project, edit these files:

   **File: `api/src/index.ts`**
   ```typescript
   cors({
     origin: [
       "http://localhost:5173",
       "http://localhost:3000",
       "https://your-webapp.vercel.app"  // ← ADD THIS
     ],
     // ...
   })
   ```

   **File: `api/index.ts`**
   ```typescript
   cors({
     origin: [
       "http://localhost:5173",
       "http://localhost:3000",
       "https://your-webapp.vercel.app"  // ← ADD THIS
     ],
     // ...
   })
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Update CORS for production webapp"
   git push
   ```

4. Vercel will automatically redeploy your API

---

### 5️⃣ Test Your Deployment

1. **Test API:**
   ```bash
   curl https://your-api.vercel.app/api/v1/health \
     -H "Authorization: Bearer your_secret_key"
   ```

2. **Create Test Data:**
   ```bash
   curl -X POST https://your-api.vercel.app/api/v1/sensors \
     -H "Authorization: Bearer your_secret_key" \
     -H "Content-Type: application/json" \
     -d '{
       "sensorName": "Temperature",
       "sensorType": "DHT22",
       "value": 25.5,
       "unit": "°C"
     }'
   ```

3. **Open Webapp:**
   Visit `https://your-webapp.vercel.app` in your browser

---

## 🎯 Quick Deployment Checklist

- [ ] PostgreSQL database created (Neon or Vercel Postgres)
- [ ] API deployed to Vercel
- [ ] Webapp deployed to Vercel
- [ ] Environment variables set correctly
- [ ] CORS updated with webapp URL
- [ ] Test data created
- [ ] Webapp displays charts correctly

---

## 🔧 Troubleshooting

### API Issues
- **Database connection failed:** Check DATABASE_URL is correct
- **Build failed:** Check all dependencies are installed
- **Runtime error:** Check logs in Vercel dashboard

### Webapp Issues
- **CORS error:** Add webapp URL to CORS in API files
- **API not found:** Check VITE_API_URL is correct
- **No data showing:** Create test data using curl

### General Issues
- **401 Unauthorized:** API_SECRET must match in both deployments
- **Deployment failed:** Check build logs in Vercel
- **Database migration:** Migrations run automatically in Vercel

---

## 📝 Your Deployment URLs

Once deployed, update these in your README:

```markdown
## Live Demo

- 🌐 **Webapp**: https://your-webapp.vercel.app
- 🔌 **API**: https://your-api.vercel.app
- 📊 **GitHub**: https://github.com/E27-25/assignment-week2-sensor-api
```

---

## 🎓 Submission Checklist

For your assignment submission:

✅ **Code Repository:**
- GitHub URL: https://github.com/E27-25/assignment-week2-sensor-api

✅ **Live Deployments:**
- API URL: `https://your-api.vercel.app`
- Webapp URL: `https://your-webapp.vercel.app`

✅ **Documentation:**
- README.md with setup instructions
- DEPLOYMENT.md (this file)
- TESTING.md with API examples

✅ **Requirements Met:**
- ✓ Sensor data API
- ✓ PostgreSQL database
- ✓ Data visualization with graphs
- ✓ Deployed on Vercel
- ✓ GitHub repository

---

## 🎉 Bonus Points

Consider adding:
- Custom domain
- Additional sensor types
- Data export functionality
- Mobile responsive improvements
- Real-time WebSocket updates

Good luck with your submission! 🚀
