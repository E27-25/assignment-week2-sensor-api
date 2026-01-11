# Deployment Guide

This guide will help you deploy both the API and webapp to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A PostgreSQL database (recommended: Vercel Postgres or Neon)
3. GitHub repository with your code

## Step 1: Set up PostgreSQL Database

### Option A: Vercel Postgres

1. Go to your Vercel dashboard
2. Click on "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name and region
6. After creation, copy the connection string (`POSTGRES_URL`)

### Option B: Neon Database

1. Go to https://neon.tech
2. Sign up and create a new project
3. Create a database
4. Copy the connection string from the dashboard

## Step 2: Deploy the API

1. Push your code to GitHub

2. Go to Vercel Dashboard
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `api`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Add Environment Variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   API_SECRET=your_secret_key_here
   ```

7. Click "Deploy"

8. After deployment, note your API URL (e.g., `https://your-api.vercel.app`)

## Step 3: Run Database Migrations

After deploying the API, you need to run migrations:

1. Install Vercel CLI locally:
```bash
npm install -g vercel
```

2. Link your project:
```bash
cd api
vercel link
```

3. Pull environment variables:
```bash
vercel env pull
```

4. Run migrations:
```bash
npm run drizzle:generate
npm run drizzle:migrate
```

## Step 4: Deploy the Webapp

1. In Vercel Dashboard, add another project
2. Select the same GitHub repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `webapp`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   ```
   VITE_API_URL=https://your-api.vercel.app/api/v1
   VITE_API_SECRET=your_secret_key_here
   ```

5. Click "Deploy"

## Step 5: Update CORS Settings

After deploying the webapp, you need to update the CORS settings in your API:

1. Note your webapp URL (e.g., `https://your-webapp.vercel.app`)
2. Update `api/src/index.ts` and `api/index.ts` to include your webapp URL in the CORS origins:

```typescript
cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://your-webapp.vercel.app"  // Add this line
  ],
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
})
```

3. Commit and push the changes
4. Vercel will automatically redeploy

## Step 6: Test Your Deployment

1. Visit your webapp URL
2. You should see the sensor dashboard
3. Test creating sensor readings using the API

Example:
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

## Troubleshooting

### API Issues

1. Check environment variables in Vercel dashboard
2. View deployment logs in Vercel
3. Check database connection string
4. Verify migrations ran successfully

### Webapp Issues

1. Check if API URL is correct in environment variables
2. Verify CORS settings include your webapp URL
3. Check browser console for errors
4. Verify API_SECRET matches between API and webapp

### Database Issues

1. Ensure connection string is correct
2. Check if database is accessible from Vercel's region
3. Verify SSL settings if required
4. Check database logs

## Custom Domain (Optional)

1. In Vercel Dashboard, go to your project settings
2. Click on "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Update CORS settings to include your custom domain

## Monitoring

- View deployment logs in Vercel Dashboard
- Check API analytics in Vercel
- Monitor database usage in your PostgreSQL provider dashboard

## Security Best Practices

1. Use strong, random API_SECRET
2. Enable SSL/TLS for database connections
3. Regularly rotate API secrets
4. Monitor API usage for suspicious activity
5. Keep dependencies up to date
