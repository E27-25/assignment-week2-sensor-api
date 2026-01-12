# Vercel Root Directory Configuration

## Issue
Vercel is looking for `api/api` instead of `api`, which causes deployment errors.

## Solution

### Check Vercel Project Settings:

1. Go to https://vercel.com/dashboard
2. Click on your **API project** (assignment-week2-sensor-api)
3. Go to **Settings** → **General**
4. Find **Root Directory** setting
5. Make sure it's set to: **`api`** (NOT `api/api`)

### Expected Configuration:

```
Root Directory: api
Build Command: (leave default or empty)
Output Directory: (leave default or empty)
Install Command: npm install
```

### Project Structure:

Your repository structure is:
```
assignment-week2-sensor-api/         ← GitHub repo root
├── api/                             ← Vercel Root Directory should point here
│   ├── index.ts                     ← Edge function
│   ├── vercel.json
│   ├── package.json
│   └── src/
└── webapp/
    └── ...
```

## After Setting Root Directory:

1. Wait for deployment limit to reset (15 minutes)
2. Redeploy from Vercel dashboard
3. Verify it deploys commit `5549e24` (the latest with Edge runtime fix)

## Test After Deployment:

```bash
# Replace with your actual Vercel URL
curl https://your-api.vercel.app/api/v1/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "...",
  "database": "connected"
}
```

---

## Deployment Limit Hit

⚠️ **Current Status:** Free tier deployment limit reached (100/day)
⏱️ **Wait Time:** 15 minutes minimum
✅ **Code Ready:** All fixes pushed to GitHub (commit 5549e24)

Once the limit resets, Vercel will deploy the correct code with Edge runtime support.
