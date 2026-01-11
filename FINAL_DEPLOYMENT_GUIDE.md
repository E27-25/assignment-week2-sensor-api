# Final Deployment Instructions

## Current Status: ✅ LOCAL TESTING COMPLETE

Your sensor API and webapp are now working locally:
- **API:** http://localhost:3000
- **Webapp:** http://localhost:5174
- **GitHub:** https://github.com/E27-25/assignment-week2-sensor-api

## What Was Fixed:

1. ✅ Removed authentication requirement from webapp
2. ✅ Updated CORS to allow webapp requests
3. ✅ Verified API endpoints return data correctly
4. ✅ Committed and pushed changes to GitHub

## Next: Deploy to Vercel (Production)

### Step 1: Deploy API to Vercel

```bash
cd api
vercel --prod
```

**Important:** After deployment, note your API URL (e.g., `https://your-api.vercel.app`)

### Step 2: Update Webapp Environment Variables for Production

In your Vercel dashboard for the webapp project:

1. Go to Project Settings → Environment Variables
2. Update `VITE_API_URL` to your production API URL:
   ```
   VITE_API_URL=https://your-api.vercel.app/api/v1
   ```
3. Remove `VITE_API_SECRET` if it exists (not needed anymore)
4. Save changes

### Step 3: Update API CORS for Production

Before deploying the API, update the CORS origins in `api/src/index.ts` to include your Vercel webapp domain:

```typescript
cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:3000",
    "https://your-webapp.vercel.app"  // Add your actual Vercel webapp URL
  ],
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
})
```

Alternatively, you can use a wildcard for development (but be cautious in production):

```typescript
cors({
  origin: "*",  // Allows all origins (use with caution)
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
})
```

### Step 4: Deploy Webapp to Vercel

```bash
cd webapp
vercel --prod
```

### Step 5: Verify Production Deployment

1. Open your deployed webapp URL in a browser
2. Check that the sensor dashboard loads data
3. Verify the chart displays sensor readings
4. Confirm data auto-refreshes every 5 seconds

## Environment Variables Checklist

### API (.env)
```env
DATABASE_URL=postgresql://user:password@host/database
PORT=3000
```

### Webapp (.env)
```env
VITE_API_URL=https://your-api.vercel.app/api/v1
```

**Note:** For Vercel, set these in the dashboard, not in .env files!

## Troubleshooting

### If webapp shows "Error loading data":

1. **Check API is running:**
   ```bash
   curl https://your-api.vercel.app/api/v1/health
   ```

2. **Check sensors endpoint:**
   ```bash
   curl https://your-api.vercel.app/api/v1/sensors?limit=5
   ```

3. **Check CORS configuration:**
   - Ensure your webapp domain is in the CORS allowed origins
   - Check browser console for CORS errors

4. **Check environment variables:**
   - Verify `VITE_API_URL` points to the correct API endpoint
   - Make sure to redeploy webapp after changing environment variables

### If API shows database errors:

1. Verify `DATABASE_URL` is set correctly in Vercel
2. Check that your PostgreSQL database is accessible
3. Verify database migrations have been run

## Database Setup on Vercel

If you haven't set up a PostgreSQL database yet:

1. Create a PostgreSQL database (options):
   - Vercel Postgres
   - Neon.tech (recommended for free tier)
   - Supabase
   - Railway

2. Get the connection string (DATABASE_URL)

3. Add to Vercel environment variables for API project

4. Run migrations:
   ```bash
   cd api
   npm run db:push
   ```

## Generate Sample Data

After deployment, generate some sample data:

```bash
# Using the bash script
./generate-mock-data.sh

# Or using Python
python generate-mock-data.py
```

## Final Checklist

- [ ] API deployed to Vercel
- [ ] PostgreSQL database created and connected
- [ ] Database migrations run
- [ ] Sample data generated
- [ ] CORS configured with webapp domain
- [ ] Webapp environment variables updated
- [ ] Webapp deployed to Vercel
- [ ] Tested production webapp loads data
- [ ] Submitted assignment on Onlearn

## Resources

- **GitHub Repository:** https://github.com/E27-25/assignment-week2-sensor-api
- **Documentation:** See README.md, DEPLOYMENT.md, VERCEL_DEPLOYMENT.md
- **Vercel Documentation:** https://vercel.com/docs

---

**Last Updated:** January 11, 2026
**Status:** Ready for Production Deployment
