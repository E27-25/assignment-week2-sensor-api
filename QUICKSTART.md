# Quick Start Guide

This guide will help you get the sensor API and webapp running quickly.

## Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (Neon, Vercel Postgres, or local)
- Terminal/Command Line

## 🚀 Quick Setup (5 minutes)

### 1. Get a PostgreSQL Database

**Option A: Neon (Recommended - Free tier available)**
1. Go to https://neon.tech and sign up
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:password@host/dbname`)

**Option B: Vercel Postgres**
1. Go to Vercel Dashboard → Storage → Create Database
2. Select Postgres
3. Copy the connection string

### 2. Set up the API

```bash
# Navigate to the API directory
cd assignment-week2-sensor-api/api

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL=your_postgresql_connection_string_here
API_SECRET=mysecretkey123
EOF

# Generate database schema
npm run drizzle:generate

# Run migrations
npm run drizzle:migrate

# Start the API server
npm run dev
```

The API should now be running on http://localhost:3000

### 3. Set up the Webapp

Open a **new terminal** window:

```bash
# Navigate to the webapp directory
cd assignment-week2-sensor-api/webapp

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:3000/api/v1
VITE_API_SECRET=mysecretkey123
EOF

# Start the webapp
npm run dev
```

The webapp should now be running on http://localhost:5173

### 4. Generate Mock Data

Open **another terminal** window and run:

```bash
cd assignment-week2-sensor-api

# Make the script executable (if not already)
chmod +x generate_mock_data.sh

# Update the script with your API secret
# Edit generate_mock_data.sh and change API_SECRET to match your .env

# Run the script
./generate_mock_data.sh
```

Or use the Python simulator:

```bash
# Update API_SECRET in simulate_sensor.py to match your .env
python3 simulate_sensor.py
```

### 5. View Your Dashboard

Open your browser and go to http://localhost:5173

You should see:
- Real-time sensor data chart
- Table of recent readings
- Auto-refreshing data every 5 seconds

## 📝 Manual Testing

You can also manually add sensor readings using curl:

```bash
curl -X POST http://localhost:3000/api/v1/sensors \
  -H "Authorization: Bearer mysecretkey123" \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Temperature Sensor",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C"
  }'
```

## 🔧 Troubleshooting

### API won't start
- Check if PostgreSQL connection string is correct
- Verify the database is accessible
- Check if port 3000 is already in use

### Webapp can't connect to API
- Verify API is running on http://localhost:3000
- Check if API_SECRET matches in both .env files
- Look for CORS errors in browser console

### No data showing in chart
- Generate some mock data using the scripts
- Check browser console for errors
- Verify API_SECRET is correct in webapp .env

### Database migration errors
- Ensure DATABASE_URL is correct
- Check database connection and permissions
- Try deleting drizzle/ folder and re-running migrations

## 📚 Next Steps

1. **Customize sensors**: Add more sensor types in the simulator
2. **Deploy to Vercel**: Follow DEPLOYMENT.md
3. **Add features**: Implement filtering, date ranges, etc.
4. **Real IoT device**: Connect an actual IoT device using the API

## 📖 Additional Resources

- See TESTING.md for more API examples
- See DEPLOYMENT.md for deployment instructions
- Check README.md for detailed project information

## 🎓 Assignment Submission

For your assignment submission:

1. **Code**: 
   - Create a GitHub repository
   - Push all your code
   - Include a README with setup instructions

2. **Deployment**:
   - Deploy to Vercel (both API and webapp)
   - Include the live URLs in your README

3. **Documentation**:
   - Explain what sensors you're simulating
   - Document any custom features you added
   - Include screenshots of the dashboard

4. **Submission**:
   - Submit GitHub repository link on Onlearn
   - OR zip the project and upload
   - Include live Vercel URLs

**Bonus Points:**
- ✨ Custom sensor types
- 📊 Multiple chart types
- 🎨 Custom styling
- 🔔 Real-time updates with WebSockets
- 📱 Mobile-responsive design
- 🔐 Additional security features

Good luck! 🚀
