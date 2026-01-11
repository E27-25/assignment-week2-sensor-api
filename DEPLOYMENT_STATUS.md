# 🔧 MANUAL DEPLOYMENT REQUIRED

## Current Status

The automatic deployments are failing with `FUNCTION_INVOCATION_FAILED` errors. This is likely due to one of these issues:

1. Missing `DATABASE_URL` environment variable in Vercel
2. TypeScript import path issues in serverless environment
3. Missing database setup

## What You Need to Do

### STEP 1: Set Up PostgreSQL Database (CRITICAL!)

Your API **REQUIRES** a PostgreSQL database. Without it, the API will fail.

**Get Free PostgreSQL:**

1. Go to **https://neon.tech** (recommended)
2. Sign up for free account
3. Create a new project
4. Copy the connection string (looks like):
   ```
   postgresql://user:password@host.region.neon.tech/database?sslmode=require
   ```

### STEP 2: Add Environment Variable to Vercel

1. Go to: https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/settings/environment-variables

2. Add new variable:
   - **Name:** `DATABASE_URL`
   - **Value:** Your PostgreSQL connection string from Step 1
   - **Environment:** Production, Preview, Development (check all)

3. Click **Save**

### STEP 3: Redeploy

After adding the environment variable:

1. Go to: https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/deployments
2. Click on the latest deployment
3. Click **Redeploy** button

### STEP 4: Check Deployment Logs

1. Go to the deployment page
2. Click on **Function Logs** tab
3. Look for error messages
4. Common errors:
   - "DATABASE_URL is not defined" → Add environment variable
   - "Cannot find module" → Build error, check imports
   - "Connection refused" → Database not accessible

## Alternative: Use Local SQLite for Testing

If you don't want to set up PostgreSQL yet, you can modify the API to use SQLite:

The API already supports SQLite via the `@libsql/client` package. The DATABASE_URL format would be:
```
file:./sensor_data.db
```

However, **SQLite won't work on Vercel** because the filesystem is read-only. You MUST use PostgreSQL for production.

## Quick Test Script

Once deployed, test with:

```bash
# Test health
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/health

# Add a sensor reading
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Test Sensor",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C"
  }'

# Get all readings
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors
```

## Troubleshooting

### If you see "FUNCTION_INVOCATION_FAILED":
- Check Vercel function logs for details
- Verify DATABASE_URL is set
- Make sure database is accessible from Vercel

### If you see "NOT_FOUND":
- The route doesn't exist
- Check the URL is correct: `/api/v1/health`

### If you see database connection errors:
- Verify connection string format
- Check database allows connections from any IP (0.0.0.0/0)
- Ensure SSL is enabled (`?sslmode=require`)

## Database Migration

After setting up the database, you need to create the tables:

The database schema is in `/api/drizzle/0000_init.sql`. You can either:

1. **Run migrations via Drizzle:**
   ```bash
   cd api
   npm run drizzle:migrate
   ```

2. **Manually create table in Neon dashboard:**
   Go to your Neon dashboard → SQL Editor → Run this:
   ```sql
   CREATE TABLE sensor_readings (
     id SERIAL PRIMARY KEY,
     sensor_name TEXT NOT NULL,
     sensor_type TEXT NOT NULL,
     value REAL NOT NULL,
     unit TEXT,
     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Summary

✅ Code is fixed and pushed to GitHub
❌ **Missing DATABASE_URL environment variable**
❌ **Database not set up**

**YOU MUST:**
1. Create PostgreSQL database (use Neon.tech)
2. Add DATABASE_URL to Vercel environment variables
3. Redeploy the API
4. Run database migrations

**Then the API will work!**

---

**Last Updated:** January 11, 2026
**Next Action:** Set up database and add DATABASE_URL to Vercel
