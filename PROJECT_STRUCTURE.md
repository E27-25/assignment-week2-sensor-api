# Project Structure

```
assignment-week2-sensor-api/
│
├── README.md                    # Main project documentation
├── QUICKSTART.md               # Quick setup guide
├── DEPLOYMENT.md               # Deployment instructions
├── TESTING.md                  # API testing examples
├── .gitignore                  # Git ignore file
├── generate_mock_data.sh       # Bash script to generate mock data
├── simulate_sensor.py          # Python script to simulate sensors
│
├── api/                        # Backend API
│   ├── src/
│   │   ├── db/
│   │   │   ├── drizzle.ts     # Database connection
│   │   │   └── schema.ts      # Database schema (PostgreSQL)
│   │   ├── routes/
│   │   │   ├── api.ts         # Main API router with auth
│   │   │   └── sensors.ts     # Sensor CRUD endpoints
│   │   └── index.ts           # Development server entry
│   ├── index.ts                # Production/Vercel entry
│   ├── drizzle.config.ts      # Drizzle ORM configuration
│   ├── package.json           # API dependencies
│   ├── tsconfig.json          # TypeScript config
│   ├── vercel.json            # Vercel deployment config
│   ├── .env.example           # Example environment variables
│   └── README.md              # API documentation
│
└── webapp/                     # Frontend React App
    ├── public/
    │   └── vite.svg           # Favicon
    ├── src/
    │   ├── components/
    │   │   └── ui/
    │   │       ├── card.tsx   # Card component (shadcn/ui)
    │   │       └── chart.tsx  # Chart component (shadcn/ui)
    │   ├── lib/
    │   │   └── utils.ts       # Utility functions
    │   ├── pages/
    │   │   └── index.tsx      # Main dashboard page
    │   ├── index.css          # Global styles
    │   ├── main.tsx           # App entry point
    │   ├── providers.tsx      # React Query provider
    │   └── vite-env.d.ts      # TypeScript definitions
    ├── components.json         # shadcn/ui config
    ├── eslint.config.js       # ESLint configuration
    ├── index.html             # HTML entry point
    ├── package.json           # Webapp dependencies
    ├── tsconfig.json          # TypeScript config
    ├── tsconfig.app.json      # TypeScript app config
    ├── tsconfig.node.json     # TypeScript node config
    ├── vite.config.ts         # Vite configuration
    ├── .env.example           # Example environment variables
    └── README.md              # Webapp documentation
```

## Key Files Explained

### Backend (API)

**`api/src/db/schema.ts`**
- Defines PostgreSQL database schema using Drizzle ORM
- `sensorReadings` table with fields: id, sensorName, sensorType, value, unit, timestamp

**`api/src/routes/sensors.ts`**
- GET `/sensors` - Fetch all sensor readings (with filters)
- POST `/sensors` - Create new sensor reading
- GET `/sensors/:id` - Get specific reading
- DELETE `/sensors/:id` - Delete reading

**`api/src/routes/api.ts`**
- Main API router
- Bearer token authentication middleware
- Health check endpoint

**`api/src/index.ts` & `api/index.ts`**
- Two entry points: development (with node server) and production (Vercel)
- CORS configuration
- API routing

### Frontend (Webapp)

**`webapp/src/pages/index.tsx`**
- Main dashboard page
- Real-time sensor data chart using Recharts
- Table view of recent readings
- Auto-refresh every 5 seconds using TanStack Query

**`webapp/src/components/ui/`**
- Reusable UI components from shadcn/ui
- Card component for layout
- Chart component for data visualization

**`webapp/src/providers.tsx`**
- Sets up TanStack Query for data fetching
- Wraps the app with necessary providers

### Utilities

**`generate_mock_data.sh`**
- Bash script to generate mock sensor data
- Creates 30 readings for temperature, humidity, and light
- Uses curl to POST data to API

**`simulate_sensor.py`**
- Python script for continuous sensor simulation
- Generates readings every 5 seconds
- Simulates multiple sensor types

## Technologies Used

### Backend
- **Hono** - Fast web framework
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **Zod** - Schema validation
- **@neondatabase/serverless** - PostgreSQL driver
- **TypeScript** - Type safety

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **TanStack Query** - Data fetching
- **Recharts** - Chart library
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Axios** - HTTP client
- **TypeScript** - Type safety

## API Endpoints

All endpoints require Bearer token authentication:
`Authorization: Bearer <API_SECRET>`

### GET `/api/v1/health`
Health check endpoint

### GET `/api/v1/sensors`
Get all sensor readings

Query parameters:
- `name` - Filter by sensor name
- `type` - Filter by sensor type
- `limit` - Limit number of results (default: 100)

### POST `/api/v1/sensors`
Create new sensor reading

Body:
```json
{
  "sensorName": "Temperature Sensor",
  "sensorType": "DHT22",
  "value": 25.5,
  "unit": "°C"
}
```

### GET `/api/v1/sensors/:id`
Get specific sensor reading by ID

### DELETE `/api/v1/sensors/:id`
Delete sensor reading by ID

## Database Schema

```sql
CREATE TABLE sensor_readings (
  id SERIAL PRIMARY KEY,
  sensor_name TEXT NOT NULL,
  sensor_type TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT,
  timestamp TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## Environment Variables

### API (.env)
```
DATABASE_URL=postgresql://user:password@host/database
API_SECRET=your_secret_key_here
```

### Webapp (.env)
```
VITE_API_URL=http://localhost:3000/api/v1
VITE_API_SECRET=your_secret_key_here
```

## Features Implemented

✅ RESTful API with CRUD operations
✅ PostgreSQL database integration
✅ Bearer token authentication
✅ Real-time data visualization with charts
✅ Auto-refreshing dashboard
✅ Responsive design
✅ TypeScript for type safety
✅ Error handling
✅ Data validation with Zod
✅ CORS configuration
✅ Mock data generation scripts
✅ Deployment configuration for Vercel

## Getting Started

See `QUICKSTART.md` for quick setup instructions.

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

## Testing

See `TESTING.md` for API testing examples and commands.
