# API Redeployment Required

## Issue Found

Your API deployment at `https://assignment-week2-sensor-api-e78v.vercel.app` is currently serving the source code instead of executing it. This is because the Vercel configuration was incorrect.

## What Was Fixed

✅ **Updated `api/vercel.json`** with proper configuration:
- Changed to use `@vercel/node` builder
- Set proper routing to `index.ts`
- This will ensure the API executes instead of serving source code

✅ **Updated `TESTING.md`**:
- Removed all authentication headers
- Added production API examples
- Updated scripts to work without authentication

## Redeploy Steps

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy API**:
   ```bash
   cd api
   vercel --prod
   ```

### Option 2: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Find your API project: `assignment-week2-sensor-api`
3. Go to the **Deployments** tab
4. Click **Redeploy** on the latest deployment
5. Or push to GitHub (which should trigger auto-deployment if connected)

### Option 3: Automatic via Git Push

Since you've already pushed to GitHub, if your Vercel project is connected to the GitHub repo, it should automatically redeploy. Check your Vercel dashboard for the deployment status.

## Verify Deployment

After redeployment, test these endpoints:

1. **Health Check:**
   ```bash
   curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/health
   ```
   
   Expected response:
   ```json
   {"status":"ok","timestamp":"2026-01-12T..."}
   ```

2. **Get Sensors:**
   ```bash
   curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors?limit=5
   ```
   
   Expected: JSON array of sensor readings (or empty array if no data yet)

## Add Test Data

Once the API is working, you can add sensor data:

### Single Temperature Reading:
```bash
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Temperature Sensor",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C"
  }'
```

### Multiple Readings (Quick Test):
```bash
# Temperature
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{"sensorName":"Temperature Sensor","sensorType":"DHT22","value":23.5,"unit":"°C"}'

# Humidity
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{"sensorName":"Humidity Sensor","sensorType":"DHT22","value":65.2,"unit":"%"}'

# Light
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{"sensorName":"Light Sensor","sensorType":"BH1750","value":450,"unit":"lux"}'

# Pressure
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{"sensorName":"Pressure Sensor","sensorType":"BMP280","value":1013.25,"unit":"hPa"}'
```

### Generate Bulk Data (20 readings):
```bash
for i in {1..20}; do
  TEMP=$(awk -v min=20 -v max=30 'BEGIN{srand(); print min+rand()*(max-min)}')
  curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
    -H "Content-Type: application/json" \
    -d "{\"sensorName\":\"Temperature Sensor\",\"sensorType\":\"DHT22\",\"value\":$TEMP,\"unit\":\"°C\"}"
  echo " - Added reading $i"
  sleep 1
done
```

## Environment Variables Checklist

Make sure these are set in Vercel dashboard for your API project:

- `DATABASE_URL` - Your PostgreSQL connection string (from Neon, Vercel Postgres, etc.)
- `PORT` - Optional, defaults to 3000

## CORS Configuration

The API currently allows these origins:
- `http://localhost:5173`
- `http://localhost:5174`
- `http://localhost:3000`

**After webapp deployment**, you need to add your webapp domain to the CORS configuration in `api/src/index.ts`:

```typescript
origin: [
  "http://localhost:5173", 
  "http://localhost:5174", 
  "http://localhost:3000",
  "https://your-webapp.vercel.app"  // Add your webapp URL
]
```

Or use a wildcard (not recommended for production):
```typescript
origin: "*"
```

## Troubleshooting

### Still seeing source code?
- Clear your browser cache
- Try in incognito/private mode
- Wait 1-2 minutes for Vercel CDN to update
- Check Vercel deployment logs

### Database connection errors?
- Verify `DATABASE_URL` is set in Vercel environment variables
- Make sure your PostgreSQL database is accessible
- Check database logs

### 500 Internal Server Error?
- Check Vercel function logs in dashboard
- Verify all dependencies are installed
- Ensure TypeScript compiles without errors

---

**Status:** Ready to redeploy
**Last Updated:** January 11, 2026
