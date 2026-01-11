# 🚨 IMMEDIATE ACTION REQUIRED: Fix Vercel Deployment

## Problem Identified

Your Vercel API project has an incorrect root directory configuration. It's looking for:
- `~/Desktop/IoT API/iot-lab-2025/assignment-week2-sensor-api/api/api` ❌

But the actual path is:
- `~/Desktop/IoT API/iot-lab-2025/assignment-week2-sensor-api/api` ✅

This is why:
1. The API is serving source code instead of executing it
2. Redeployment is failing with path errors

## Fix Options

### Option 1: Fix via Vercel Dashboard (RECOMMENDED - EASIEST)

1. **Go to Vercel Dashboard:**
   - https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/settings

2. **Update Root Directory:**
   - Go to **Settings** → **General**
   - Find **Root Directory** setting
   - Change from `api` to `.` (dot means root)
   - Or leave it empty
   - Click **Save**

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Click **Redeploy** button

### Option 2: Delete and Recreate Project

If the above doesn't work:

1. **Delete the existing Vercel project:**
   - Go to Settings → Advanced → Delete Project

2. **Create a new project:**
   ```bash
   cd /Users/e27/Desktop/IoT\ API/iot-lab-2025/assignment-week2-sensor-api/api
   vercel --prod
   ```

3. **When prompted:**
   - Set up and deploy? **Yes**
   - Scope? Select your account
   - Link to existing? **No**
   - Project name? `assignment-week2-sensor-api-api` (or any name you want)
   - Root directory? `.` (just press Enter)

### Option 3: Push to GitHub (Auto-deploy)

If your Vercel project is connected to GitHub:

1. **The fix has already been pushed to GitHub:**
   - Latest commit includes the corrected `vercel.json`
   - Repository: https://github.com/E27-25/assignment-week2-sensor-api

2. **Vercel should auto-deploy:**
   - Check your Vercel dashboard for deployment status
   - May take 1-2 minutes to complete

3. **If not auto-deploying:**
   - Go to Vercel Dashboard → Settings → Git
   - Check if GitHub integration is connected
   - Manually trigger a redeploy from Deployments tab

## After Successful Deployment

Once the API is deployed and working, verify with:

```bash
# Test health endpoint
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-01-12T..."}
```

Then add test data:

```bash
# Add a temperature reading
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Temperature Sensor",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C"
  }'
```

## Quick Test Data Script

After deployment is fixed, run this to add multiple readings:

```bash
# Add 10 temperature readings
for i in {1..10}; do
  TEMP=$(awk -v min=20 -v max=30 'BEGIN{srand(); print min+rand()*(max-min)}')
  curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
    -H "Content-Type: application/json" \
    -d "{\"sensorName\":\"Temperature Sensor\",\"sensorType\":\"DHT22\",\"value\":$TEMP,\"unit\":\"°C\"}"
  echo " ✓ Reading $i added"
  sleep 1
done

# Add 10 humidity readings
for i in {1..10}; do
  HUMIDITY=$(awk -v min=40 -v max=80 'BEGIN{srand(); print min+rand()*(max-min)}')
  curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
    -H "Content-Type: application/json" \
    -d "{\"sensorName\":\"Humidity Sensor\",\"sensorType\":\"DHT22\",\"value\":$HUMIDITY,\"unit\":\"%\"}"
  echo " ✓ Reading $i added"
  sleep 1
done
```

## Environment Variables

Make sure these are set in Vercel Dashboard → Settings → Environment Variables:

- **DATABASE_URL** - Your PostgreSQL connection string
  - Get free PostgreSQL from: https://neon.tech or Vercel Postgres
  - Format: `postgresql://user:password@host/database`

## What's Been Fixed

✅ Removed authentication requirement from webapp
✅ Fixed `api/vercel.json` configuration
✅ Updated CORS to allow webapp requests
✅ Removed auth from TESTING.md documentation
✅ All changes committed and pushed to GitHub

## Next Steps After API is Working

1. ✅ Fix API deployment (you're here)
2. Update webapp's `VITE_API_URL` in Vercel
3. Redeploy webapp
4. Test the complete system
5. Generate sample data
6. Submit assignment

---

**Current Status:** Waiting for Vercel project settings fix
**Recommended Action:** Use Option 1 (Vercel Dashboard) - it's the quickest!
**Last Updated:** January 11, 2026
