# 🚀 DEPLOYMENT READY - Quick Reference

## ✅ What's Fixed
- Changed from Node.js runtime → **Edge runtime**
- Switched from postgres-js → **@vercel/postgres**
- Updated vercel.json for proper Edge function configuration
- All changes committed and pushed to GitHub

## 📋 Vercel Deployment Checklist

### 1. Environment Variables (CRITICAL)
Set these in your Vercel project settings:

```
POSTGRES_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

OR

```
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

⚠️ **@vercel/postgres will automatically use either variable.**

---

### 2. Project Settings
- **Root Directory:** `api`
- **Build Command:** (leave default)
- **Output Directory:** (leave default)
- **Install Command:** `npm install`

---

### 3. Deploy
Vercel will auto-deploy from GitHub, OR:
- Go to your Vercel dashboard
- Click "Redeploy" on your API project

---

## 🧪 Test After Deployment

```bash
# Replace YOUR_API_URL with actual Vercel URL
API_URL="https://your-api-name.vercel.app"

# Health check
curl $API_URL/api/v1/health

# Add sensor data (POST)
curl -X POST $API_URL/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensor_type": "temperature",
    "sensor_id": "sensor-001",
    "value": 25.5,
    "unit": "celsius"
  }'

# Get all sensors
curl $API_URL/api/v1/sensors

# Get specific sensor
curl $API_URL/api/v1/sensors/1
```

---

## 🌐 Update Webapp

After API is deployed, update `webapp/.env`:

```env
VITE_API_URL=https://your-api-name.vercel.app
```

Then deploy webapp:
```bash
cd webapp
vercel --prod
```

---

## 📊 Expected Response

### Health Check (`/api/v1/health`)
```json
{
  "status": "ok",
  "timestamp": "2025-06-15T10:30:00.000Z",
  "database": "connected"
}
```

### Root (`/`)
```json
{
  "message": "Sensor API - Assignment Week 2",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/v1/health",
    "sensors": "/api/v1/sensors"
  }
}
```

---

## ⚠️ Common Issues

### Issue: Still getting 404
**Solution:**
1. Check Vercel deployment logs
2. Verify `POSTGRES_URL` is set
3. Confirm Root Directory is `api`
4. Try manual redeploy

### Issue: Database connection error
**Solution:**
1. Verify Neon.tech connection string
2. Ensure connection string includes `?sslmode=require`
3. Check Neon.tech database is active
4. Run migrations on production DB

### Issue: CORS error in webapp
**Solution:**
1. API already allows all origins (`origin: "*"`)
2. Check webapp is using correct API URL
3. Ensure HTTPS in production

---

## 📂 File Changes Summary

### Modified Files:
1. `api/index.ts` - Changed runtime to "edge"
2. `api/src/db/drizzle.ts` - Using @vercel/postgres
3. `api/vercel.json` - Added Edge runtime config
4. `api/package.json` - Added @vercel/postgres dependency

### Documentation Added:
- `VERCEL_EDGE_RUNTIME_FIX.md` - Detailed fix explanation
- `DEPLOYMENT_READY_QUICKREF.md` - This file

---

## 🎯 Next Actions

1. ⏳ **Wait** for Vercel to auto-deploy (or manually trigger)
2. ✅ **Test** API endpoints
3. 🔧 **Update** webapp with API URL
4. 🚀 **Deploy** webapp
5. 📸 **Test** full integration
6. 📤 **Submit** assignment with screenshots

---

**GitHub Repository:** https://github.com/E27-25/assignment-week2-sensor-api

**Status:** ✅ **READY TO DEPLOY** - All code pushed, waiting for Vercel
