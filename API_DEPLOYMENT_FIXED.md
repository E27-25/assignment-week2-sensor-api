# ✅ API Fixed - Now Redeploy to Vercel

## What Was Fixed

Your API had two issues:

1. ❌ **Wrong export format** - Wasn't using Vercel's serverless function format
2. ❌ **Wrong routing** - Routes weren't configured properly for Vercel

### Changes Made:

✅ **Updated `index.ts`**:
- Now uses `hono/vercel` adapter with `handle()` export
- Added `/api` base path to match Vercel's serverless structure
- Updated CORS to allow all origins (wildcard for easier testing)
- Routes now properly mounted at `/api/v1/*`

✅ **Updated `vercel.json`**:
- Simplified configuration using `rewrites`
- All `/api/*` requests routed to the serverless function

## How to Deploy

### Option 1: Auto-Deploy (If Connected to GitHub)

**The fix has been pushed to GitHub!**

1. Check your Vercel dashboard: https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v
2. Go to **Deployments** tab
3. You should see a new deployment in progress (triggered by the git push)
4. Wait for it to complete (usually 1-2 minutes)

### Option 2: Manual Redeploy via Dashboard

1. Go to: https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/deployments
2. Click on the latest deployment
3. Click the **Redeploy** button
4. Wait for completion

### Option 3: Vercel CLI (Fresh Deployment)

If the above don't work, deploy fresh:

```bash
cd '/Users/e27/Desktop/IoT API/iot-lab-2025/assignment-week2-sensor-api/api'

# Remove old Vercel config
rm -rf .vercel

# Deploy
vercel --prod
```

When prompted:
- **Set up and deploy?** Yes
- **Scope?** Select your account
- **Link to existing?** No (create new) OR Yes (link to existing)
- **Project name?** `assignment-week2-sensor-api` or any name

## Test After Deployment

Once deployed, test these endpoints:

### 1. Root API Endpoint
```bash
curl https://assignment-week2-sensor-api-e78v.vercel.app/api
```

Expected:
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

### 2. Health Check
```bash
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/health
```

Expected:
```json
{"status":"ok","timestamp":"2026-01-12T..."}
```

### 3. Get Sensors
```bash
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors?limit=5
```

Expected: `[]` (empty array) or sensor data if you've added any

## Add Test Data

Once the API is working:

```bash
# Quick test - add one reading
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Temperature Sensor",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C"
  }'
```

Expected:
```json
{"success":true,"data":{...}}
```

### Bulk Test Data

Run the provided script:

```bash
cd '/Users/e27/Desktop/IoT API/iot-lab-2025/assignment-week2-sensor-api'
./add-production-data.sh
```

This will add 50 sensor readings across 4 different sensor types.

## Environment Variables

Make sure these are set in Vercel (Settings → Environment Variables):

- **DATABASE_URL** - PostgreSQL connection string
  - Format: `postgresql://user:password@host/database?sslmode=require`
  - Get free database from: https://neon.tech

**Important:** If you don't have a PostgreSQL database yet, the API won't work! You MUST set up a database first.

### Get Free PostgreSQL Database:

1. Go to https://neon.tech
2. Sign up (free tier available)
3. Create a new project
4. Copy the connection string
5. Add to Vercel as `DATABASE_URL` environment variable
6. Redeploy the API

## Common Issues

### "NOT_FOUND" Error
- Wait 2-3 minutes for CDN cache to clear
- Try in incognito/private browser
- Clear browser cache

### "Internal Server Error"
- Check Vercel function logs in dashboard
- Verify `DATABASE_URL` is set correctly
- Make sure database is accessible

### Database Connection Errors
- Verify connection string format
- Check database allows connections from Vercel IPs
- Ensure SSL mode is correct (`?sslmode=require` for most)

## Next Steps

After API is working:

1. ✅ Test API endpoints
2. ✅ Add test data
3. 📱 Update webapp's `VITE_API_URL` in Vercel
4. 🚀 Redeploy webapp
5. 🎉 Test complete system

## Check Deployment Status

Monitor the deployment here:
- **Deployments:** https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/deployments
- **Logs:** Click on any deployment to see function logs

---

**Status:** Code fixed and pushed to GitHub
**Action:** Wait for auto-deploy OR manually redeploy
**Last Updated:** January 11, 2026
