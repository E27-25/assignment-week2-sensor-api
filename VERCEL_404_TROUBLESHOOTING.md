# 🔧 Vercel Deployment Troubleshooting - 404 NOT_FOUND

## Current Issue

Getting `404 NOT_FOUND` on all API endpoints after deployment.

## Possible Causes & Solutions

### 1. Missing DATABASE_URL Environment Variable ⚠️

**This is the most likely cause!**

The API requires `DATABASE_URL` to be set in Vercel, otherwise it may fail to start properly.

**Fix:**
1. Go to: https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/settings/environment-variables
2. Click "Add New"
3. **Name:** `DATABASE_URL`
4. **Value:** `postgresql://neondb_owner:npg_d2ZAsw1NjzYX@ep-weathered-cloud-ahm7a2pt-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require`
5. **Environments:** Check all (Production, Preview, Development)
6. Click "Save"
7. **Redeploy:** Go to Deployments → Latest → Redeploy

### 2. Check Vercel Function Logs

1. Go to: https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/deployments
2. Click on the latest deployment
3. Click "Functions" tab
4. Look for any errors

Common errors:
- `Cannot find module` - Build issue
- `DATABASE_URL is not defined` - Missing env variable
- `Connection refused` - Database not accessible

### 3. Verify Project Settings

Go to: https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/settings

Check:
- **Root Directory:** Should be empty or `.`
- **Build Command:** `npm run build` or auto-detected
- **Output Directory:** `dist` or auto-detected
- **Install Command:** `npm install` or auto-detected

###4. Alternative: Create Fresh Vercel Project

If the above doesn't work, create a new Vercel project:

```bash
cd '/Users/e27/Desktop/IoT API/iot-lab-2025/assignment-week2-sensor-api/api'

# Remove old Vercel config
rm -rf .vercel

# Create new deployment
vercel --prod

# When prompted:
# - Set up new project? Yes
# - Project name? assignment-week2-sensor-api-new
# - Root directory? .
```

Then add the `DATABASE_URL` environment variable to the new project.

### 5. Test Alternative Deployment Method

Try deploying without the Vercel CLI - use GitHub integration:

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo
4. **Root Directory:** `api`
5. Add environment variable: `DATABASE_URL`
6. Deploy

## Quick Diagnostic Commands

```bash
# Test if Vercel deployment exists
curl -I https://assignment-week2-sensor-api-e78v.vercel.app

# Test root endpoint
curl https://assignment-week2-sensor-api-e78v.vercel.app/

# Test API endpoint
curl https://assignment-week2-sensor-api-e78v.vercel.app/api

# Test health endpoint
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/health
```

## What's Working

✅ **Local API:** Everything works perfectly at http://localhost:3000
✅ **Database:** PostgreSQL connection working
✅ **Code:** All endpoints tested and functional
✅ **Repository:** Code pushed to GitHub

## Recommendation

**Option 1: Add DATABASE_URL to Vercel (Most Likely Fix)**
- This is probably the issue
- The API can't start without the database connection
- Add the environment variable and redeploy

**Option 2: Use Local Development for Now**
- Your local setup works perfectly
- Use it for testing and screenshots
- Deploy to production later when Vercel issues are resolved

**Option 3: Try Alternative Hosting**
- Railway.app (also has free tier)
- Render.com (free tier)
- Fly.io (free tier)

## Next Steps

1. ✅ **Add DATABASE_URL** to Vercel environment variables
2. ✅ **Redeploy** the API
3. ✅ **Check Function Logs** in Vercel dashboard
4. ✅ **Test endpoints** after deployment

If still not working after adding DATABASE_URL, check the function logs for specific error messages.

---

**Status:** Troubleshooting Vercel 404 errors
**Most Likely Fix:** Add DATABASE_URL environment variable
**Alternative:** Use local development for demonstration
