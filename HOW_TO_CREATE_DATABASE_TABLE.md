# 📊 How to Create the Database Table

## Where to Create It

You need to create the database table in your **PostgreSQL database** (not locally, but on the server).

---

## ✅ RECOMMENDED: Option 1 - Neon.tech SQL Editor (Easiest!)

### Step 1: Go to Neon Dashboard
- Visit: https://console.neon.tech
- Log in to your account

### Step 2: Create a New Project (if you haven't already)
- Click "New Project"
- Name it: `sensor-api` or any name you like
- Select region (choose closest to you)
- Click "Create Project"

### Step 3: Open SQL Editor
- In the left sidebar, click **"SQL Editor"**
- You'll see a text area where you can write SQL queries

### Step 4: Copy and Paste This SQL

```sql
CREATE TABLE IF NOT EXISTS sensor_readings (
  id SERIAL PRIMARY KEY,
  sensor_name TEXT NOT NULL,
  sensor_type TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 5: Run the Query
- Click the **"Run"** button (or press Cmd/Ctrl + Enter)
- You should see: "Command completed successfully"

### Step 6: Verify Table Was Created
Run this query to check:
```sql
SELECT * FROM sensor_readings LIMIT 5;
```

You should see column headers but no data yet (that's normal!).

### Step 7: Copy Your Connection String
- In Neon dashboard, go to **"Dashboard"** (home icon)
- You'll see **"Connection string"**
- Click to copy it
- It looks like:
  ```
  postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/database?sslmode=require
  ```

### Step 8: Add to Vercel
- Go to: https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/settings/environment-variables
- Click "Add New"
- Name: `DATABASE_URL`
- Value: Paste your connection string
- Select: Production, Preview, Development
- Click "Save"

### Step 9: Redeploy Your API
- Go to: https://vercel.com/e27-25s-projects/assignment-week2-sensor-api-e78v/deployments
- Click latest deployment
- Click "Redeploy"

---

## Option 2 - Using a PostgreSQL Client

If you have a PostgreSQL client like **pgAdmin**, **TablePlus**, or **DBeaver**:

1. **Connect to your Neon database** using the connection string
2. **Open a SQL query window**
3. **Paste and run:**
   ```sql
   CREATE TABLE IF NOT EXISTS sensor_readings (
     id SERIAL PRIMARY KEY,
     sensor_name TEXT NOT NULL,
     sensor_type TEXT NOT NULL,
     value REAL NOT NULL,
     unit TEXT,
     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

---

## Option 3 - Using Terminal/Command Line

If you have PostgreSQL client installed (`psql`):

```bash
# Connect to your database (replace with your connection string)
psql "postgresql://user:password@host.neon.tech/database?sslmode=require"

# Then run:
CREATE TABLE IF NOT EXISTS sensor_readings (
  id SERIAL PRIMARY KEY,
  sensor_name TEXT NOT NULL,
  sensor_type TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Exit
\q
```

---

## Option 4 - Using Drizzle Kit (Advanced)

If you want to use the migration tool:

1. **Update your local `.env` file** with your PostgreSQL connection:
   ```env
   DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
   ```

2. **Update `drizzle.config.ts`** to use PostgreSQL dialect

3. **Generate new migrations:**
   ```bash
   cd api
   npm run drizzle:generate
   ```

4. **Push to database:**
   ```bash
   npm run drizzle:push
   ```

---

## 🎯 Quick Start (Copy & Paste This!)

### The Complete Setup Process:

1. **Create free PostgreSQL on Neon:**
   - Go to https://neon.tech
   - Sign up
   - Create project
   - Copy connection string

2. **Create table in Neon SQL Editor:**
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

3. **Add to Vercel:**
   - Settings → Environment Variables
   - Add `DATABASE_URL` = your connection string
   - Save

4. **Redeploy:**
   - Deployments → Redeploy

5. **Test:**
   ```bash
   curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/health
   ```

---

## Verify It Works

After creating the table and redeploying, test your API:

```bash
# Test health endpoint
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/health

# Should return:
# {"status":"ok","timestamp":"2026-01-12T..."}

# Add a test sensor reading
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Temperature Sensor",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C"
  }'

# Should return:
# {"success":true,"data":{...}}

# Get all readings
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors

# Should return your data:
# [{"id":1,"sensorName":"Temperature Sensor",...}]
```

---

## Common Issues

### "relation 'sensor_readings' does not exist"
- The table wasn't created
- Go back to Neon SQL Editor and run the CREATE TABLE query

### "Cannot connect to database"
- Check your connection string is correct
- Make sure you added it to Vercel environment variables
- Verify the database is running in Neon dashboard

### "SSL connection required"
- Make sure your connection string ends with `?sslmode=require`

---

**Bottom line:** Use **Neon.tech SQL Editor** - it's the easiest way! 🚀
