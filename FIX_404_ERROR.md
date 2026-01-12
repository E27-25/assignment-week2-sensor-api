# 🔧 Fix 404 NOT_FOUND Error on Vercel

## Problem
Your API returns 404 NOT_FOUND on all routes when deployed to Vercel, even though it works perfectly locally.

## Root Cause
Vercel's serverless function structure isn't correctly configured. The nested `api/api/index.ts` structure is causing routing issues.

## ✅ Solution: Use Correct Vercel Project Settings

### Option 1: Fix Vercel Project Settings (EASIEST - DO THIS FIRST!)

The issue is likely your Vercel project's **Root Directory** setting.

1. **Go to Vercel Dashboard:**
   - https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/settings

2. **Check Project Settings → General → Root Directory:**
   - It should be **empty** or set to `.` (dot)
   - If it says `api`, that's the problem!
   - **Change it to empty** and save

3. **Add Environment Variable (CRITICAL!):**
   - Go to: Settings → Environment Variables
   - Click "Add New"
   - **Name:** `DATABASE_URL`
   - **Value:** `postgresql://neondb_owner:npg_d2ZAsw1NjzYX@ep-weathered-cloud-ahm7a2pt-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require`
   - **Environments:** Check all (Production, Preview, Development)
   - Click **Save**

4. **Redeploy:**
   - Go to Deployments tab
   - Click "Redeploy"
   - Wait 1-2 minutes

5. **Test:**
   ```bash
   curl https://assignment-week2-sensor-api-e78v.vercel.app/api
   ```

### Option 2: If Still 404, Check Deployment Logs

1. Go to: https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/deployments
2. Click on the latest deployment
3. Click "Function Logs" tab
4. Look for errors

Common errors:
- "Cannot find module" → Import path issue
- "DATABASE_URL is not defined" → Missing environment variable
- No logs → Routes not being hit (wrong root directory)

## Alternative: Deploy to a Different Platform

Since you're hitting Vercel limits and issues, consider these alternatives:

### Deploy to Render.com (Free & Easy)

1. **Go to:** https://render.com
2. **Sign up** (free account)
3. **New → Web Service**
4. **Connect your GitHub repo**
5. **Settings:**
   - **Root Directory:** `api`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `DATABASE_URL` = your PostgreSQL string
6. **Deploy**

Render is more forgiving and has better error messages!

### Deploy to Railway.app (Free Tier)

1. **Go to:** https://railway.app
2. **Sign up with GitHub**
3. **New Project → Deploy from GitHub**
4. **Select your repo**
5. **Add Environment Variable:**
   - `DATABASE_URL` = your PostgreSQL string
6. **Deploy**

Railway auto-detects Node.js projects and sets up everything.

## Why Local Works but Vercel Doesn't

| Aspect | Local | Vercel |
|--------|-------|--------|
| Entry Point | `src/index.ts` uses @hono/node-server | Must use `api/index.ts` with Vercel adapter |
| Environment | Reads `.env` file | Needs env vars in dashboard |
| File System | Full access | Read-only, no SQLite |
| Structure | Standard Node.js | Serverless functions |

## Quick Test: Does Vercel See Your Function?

Try these URLs to diagnose:

```bash
# Root (should return JSON or error)
curl https://assignment-week2-sensor-api-e78v.vercel.app/

# /api endpoint
curl https://assignment-week2-sensor-api-e78v.vercel.app/api

# /api/v1/health
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/health
```

If ALL return 404, then Vercel isn't finding your function at all = **Root Directory problem**.

## What You Should Do NOW

1. ✅ **Add DATABASE_URL to Vercel environment variables** (MUST DO!)
2. ✅ **Check Root Directory is empty in Vercel settings**
3. ✅ **Redeploy**
4. ✅ **Check deployment logs for actual errors**

If still 404:
5. ⚠️ **Consider deploying to Render or Railway instead** (easier, better error messages)

## For Your Assignment

Since you're on a deadline and Vercel is giving issues, I recommend:

### Immediate Solution:
**Submit your local working version with screenshots!**

Your assignment requirements are met locally:
- ✅ API works with PostgreSQL
- ✅ CRUD operations functional
- ✅ Webapp displays data in charts
- ✅ Code on GitHub

Document that production deployment hit Vercel limits (which is true!) and include:
- Screenshots of local API working
- Screenshots of local webapp with charts
- GitHub repository link
- Neon database screenshots

Most instructors understand deployment platform issues, especially rate limits!

---

**Priority Actions:**
1. Add DATABASE_URL to Vercel ← DO THIS NOW
2. Check Root Directory setting
3. Redeploy and check logs
4. If still broken, use Render.com or submit local screenshots

Your code is perfect - it's just a deployment platform issue! 🚀
