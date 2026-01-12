# Assignment Week 2 - Sensor API with PostgreSQL

A full-stack IoT sensor monitoring application with a public RESTful API and real-time data visualization dashboard. Built with modern technologies and deployed on Vercel with PostgreSQL database on Neon.tech.

🌐 **Live Demo**: 
- API: https://assignment-week2-sensor-api-e78v.vercel.app
- Webapp: https://assignment-week2-sensor-api-webapp.vercel.app

📦 **GitHub Repository**: https://github.com/E27-25/assignment-week2-sensor-api

## Features

- 📊 Real-time sensor data visualization with interactive charts
- 🗄️ PostgreSQL database for reliable data storage
- 🚀 Fast and lightweight RESTful API built with Hono
- ⚛️ Modern React frontend with Recharts for data visualization
- 🎨 Beautiful UI with Tailwind CSS and shadcn/ui components
- 📱 Fully responsive design for mobile and desktop
- 🔓 Public API endpoints (no authentication required)
- ⚡ Edge runtime deployment on Vercel
- 🔄 Auto-refreshing dashboard (updates every 5 seconds)
- ☁️ Production-ready and scalable

## Project Structure

```
assignment-week2-sensor-api/
├── api/                    # Backend API (Vercel Edge Function)
│   ├── api/
│   │   └── index.ts       # Vercel Edge function entry point
│   ├── src/
│   │   ├── db/            # Database schema and connection
│   │   │   ├── drizzle.ts # PostgreSQL connection with @vercel/postgres
│   │   │   └── schema.ts  # Drizzle ORM schema definition
│   │   └── routes/        # API route handlers
│   │       ├── api.ts     # Main API router with health check
│   │       └── sensors.ts # Sensor CRUD endpoints
│   ├── drizzle.config.ts  # Drizzle ORM configuration
│   ├── package.json       # Backend dependencies
│   ├── tsconfig.json      # TypeScript configuration
│   └── vercel.json        # Vercel deployment configuration
│
└── webapp/                # Frontend React App
    ├── src/
    │   ├── components/
    │   │   └── ui/        # shadcn/ui components (Card, Chart)
    │   ├── pages/
    │   │   └── index.tsx  # Main dashboard with real-time charts
    │   ├── lib/
    │   │   └── utils.ts   # Utility functions
    │   ├── main.tsx       # App entry point
    │   └── index.css      # Global styles with Tailwind
    ├── components.json     # shadcn/ui configuration
    ├── index.html         # HTML entry point
    ├── package.json       # Frontend dependencies
    ├── vite.config.ts     # Vite build configuration
    └── tailwind.config.js # Tailwind CSS configuration
```

## Setup Instructions

### Prerequisites

- Node.js 18+ or Bun runtime
- PostgreSQL database (Neon.tech, Vercel Postgres, or local PostgreSQL)
- Git (for version control)

### Database Setup (Neon.tech)

1. Sign up for a free account at [Neon.tech](https://neon.tech)
2. Create a new project
3. Copy your PostgreSQL connection string (format: `postgresql://user:password@host/database`)

### API Setup

1. Navigate to the API directory:
```bash
cd api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `api` directory:
```env
# PostgreSQL connection string from Neon.tech
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Vercel Postgres pool connection (optional, for Vercel deployment)
POSTGRES_URL=your_vercel_postgres_url
```

4. Generate and run database migrations:
```bash
npm run drizzle:generate
npm run drizzle:migrate
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

**Test the API:**
```bash
# Health check
curl http://localhost:3000/v1/health

# Get all sensors
curl http://localhost:3000/v1/sensors

# Add a sensor reading
curl -X POST http://localhost:3000/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{"sensorName":"Temperature","sensorType":"DHT22","value":25.5,"unit":"°C"}'
```

### Webapp Setup

1. Navigate to the webapp directory:
```bash
cd webapp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `webapp` directory:
```env
# Point to your local API or production API
VITE_API_URL=http://localhost:3000
```

For production, use:
```env
VITE_API_URL=https://assignment-week2-sensor-api-e78v.vercel.app
```

4. Start the development server:
```bash
npm run dev
```

The webapp will be available at `http://localhost:5173`

## API Endpoints

All endpoints are public and do not require authentication.

**Base URL (Production):** `https://assignment-week2-sensor-api-e78v.vercel.app`

### `GET /v1/health`
Health check endpoint to verify API is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-20T12:00:00.000Z"
}
```

**Example:**
```bash
curl https://assignment-week2-sensor-api-e78v.vercel.app/v1/health
```

---

### `GET /v1/sensors`
Get all sensor readings with optional filters.

**Query Parameters:**
- `name` (optional): Filter by sensor name
- `type` (optional): Filter by sensor type

**Response:**
```json
[
  {
    "id": 1,
    "sensorName": "Temperature Sensor",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C",
    "timestamp": "2024-01-20T12:00:00.000Z"
  }
]
```

**Example:**
```bash
# Get all sensors
curl https://assignment-week2-sensor-api-e78v.vercel.app/v1/sensors

# Filter by sensor name
curl https://assignment-week2-sensor-api-e78v.vercel.app/v1/sensors?name=Temperature

# Filter by sensor type
curl https://assignment-week2-sensor-api-e78v.vercel.app/v1/sensors?type=DHT22
```

---

### `POST /v1/sensors`
Create a new sensor reading.

**Request Body:**
```json
{
  "sensorName": "Temperature Sensor",
  "sensorType": "DHT22",
  "value": 25.5,
  "unit": "°C"
}
```

**Response:**
```json
{
  "id": 1,
  "sensorName": "Temperature Sensor",
  "sensorType": "DHT22",
  "value": 25.5,
  "unit": "°C",
  "timestamp": "2024-01-20T12:00:00.000Z"
}
```

**Example:**
```bash
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Temperature Sensor",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C"
  }'
```

## Deployment to Vercel

This application is deployed on Vercel with two separate projects:

### Deploy API

1. **Push to GitHub:**
```bash
git add .
git commit -m "Deploy sensor API"
git push origin main
```

2. **Create Vercel Project:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - **Important:** Set **Root Directory** to `api`
   - Framework Preset: Other

3. **Configure Environment Variables:**
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `POSTGRES_URL`: (Optional) Vercel Postgres connection string

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your API will be live at: `https://your-project.vercel.app`

5. **Run Database Migrations:**
   - After first deployment, run migrations manually:
   ```bash
   cd api
   npm run drizzle:migrate
   ```

### Deploy Webapp

1. **Create Second Vercel Project:**
   - In Vercel Dashboard, click "Add New" → "Project"
   - Import the same GitHub repository
   - **Important:** Set **Root Directory** to `webapp`
   - Framework Preset: Vite

2. **Configure Environment Variables:**
   - `VITE_API_URL`: Your deployed API URL (e.g., `https://assignment-week2-sensor-api-e78v.vercel.app`)

3. **Deploy:**
   - Click "Deploy"
   - Your webapp will be live at: `https://your-webapp.vercel.app`

### Important Notes

- The API uses **Vercel Edge Runtime** for fast, global performance
- Database migrations must be run separately after deployment
- CORS is configured to allow all origins for public API access
- Both API and webapp auto-deploy on git push to main branch

## Testing the Production API

Once deployed, test your API endpoints:

```bash
# Health check
curl https://assignment-week2-sensor-api-e78v.vercel.app/v1/health

# Get all sensors
curl https://assignment-week2-sensor-api-e78v.vercel.app/v1/sensors

# Add a sensor reading
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Temperature",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C"
  }'
```

## Technologies Used

### Backend
- **[Hono](https://hono.dev/)**: Fast, lightweight web framework for Edge runtime
- **[Drizzle ORM](https://orm.drizzle.team/)**: Type-safe ORM for PostgreSQL
- **[PostgreSQL](https://www.postgresql.org/)**: Reliable relational database
- **[@vercel/postgres](https://vercel.com/docs/storage/vercel-postgres)**: Vercel's PostgreSQL SDK
- **[Zod](https://zod.dev/)**: TypeScript-first schema validation
- **TypeScript**: Type safety and better developer experience
- **Vercel Edge Runtime**: Global, fast serverless functions

### Frontend
- **[React 19](https://react.dev/)**: Modern UI library with latest features
- **[Vite](https://vitejs.dev/)**: Lightning-fast build tool and dev server
- **[Recharts](https://recharts.org/)**: Composable charting library
- **[TanStack Query](https://tanstack.com/query)**: Powerful data fetching and caching
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)**: Beautiful, accessible component library
- **TypeScript**: Type safety throughout the application

### Database & Infrastructure
- **[Neon](https://neon.tech/)**: Serverless PostgreSQL with branching
- **[Vercel](https://vercel.com/)**: Edge deployment platform
- **Git/GitHub**: Version control and collaboration

## Database Schema

```typescript
// src/db/schema.ts
export const sensors = pgTable('sensors', {
  id: serial('id').primaryKey(),
  sensorName: varchar('sensor_name', { length: 255 }).notNull(),
  sensorType: varchar('sensor_type', { length: 255 }).notNull(),
  value: real('value').notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});
```

## Features in Detail

### Real-time Dashboard
- Auto-refreshing charts update every 5 seconds
- Line charts show sensor trends over time
- Separate charts for each sensor type
- Responsive grid layout adapts to screen size

### API Design
- RESTful architecture following best practices
- JSON request/response format
- Proper HTTP status codes
- Input validation with Zod schemas
- Type-safe database queries with Drizzle ORM

### Production Ready
- Edge runtime for global low-latency
- Connection pooling for database efficiency
- Error handling and logging
- Environment-based configuration
- CORS enabled for cross-origin requests

## Development Scripts

### API Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run drizzle:generate  # Generate migrations
npm run drizzle:migrate   # Run migrations
npm run drizzle:studio    # Open Drizzle Studio (database GUI)
```

### Webapp Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Troubleshooting

### Common Issues

**Issue: API returns CORS errors**
- Solution: Check that CORS is properly configured in `api/api/index.ts`
- Ensure `VITE_API_URL` in webapp `.env` matches your API URL

**Issue: Database connection fails**
- Solution: Verify `DATABASE_URL` format: `postgresql://user:password@host/database?sslmode=require`
- Check Neon console for correct connection string
- Ensure database migrations have been run

**Issue: Webapp doesn't show data**
- Solution: Check browser console for errors
- Verify API is accessible at the URL in `.env`
- Test API endpoints directly with curl

**Issue: Vercel deployment fails**
- Solution: Ensure Root Directory is set correctly (`api` or `webapp`)
- Check environment variables are set in Vercel dashboard
- Review build logs for specific errors

## Contributing

This is an educational project. Feel free to fork and modify for your own learning purposes.

## License

MIT License - feel free to use this project for learning and development.

## Author

**E27** - IoT Development Assignment Week 2

## Acknowledgments

- Built as part of an IoT Development course
- Uses modern web development best practices
- Demonstrates full-stack TypeScript development
- Production deployment on Vercel platform
