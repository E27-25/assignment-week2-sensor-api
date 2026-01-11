# Assignment Week 2 - Sensor API with PostgreSQL

This project contains a website and API to support Sensor data from an IoT Device with PostgreSQL database.

## Features

- 📊 Real-time sensor data visualization with graphs
- 🗄️ PostgreSQL database for data storage
- 🚀 RESTful API built with Hono
- ⚛️ React frontend with Recharts for data visualization
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📱 Responsive design
- ☁️ Deployable to Vercel

## Project Structure

```
assignment-week2-sensor-api/
├── api/                    # Backend API
│   ├── src/
│   │   ├── db/            # Database schema and connection
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Entry point
│   ├── drizzle.config.ts  # Drizzle ORM config
│   ├── package.json
│   └── vercel.json        # Vercel deployment config
└── webapp/                # Frontend React app
    ├── src/
    │   ├── components/    # UI components
    │   ├── pages/         # Page components
    │   └── main.tsx       # Entry point
    ├── package.json
    └── vite.config.ts     # Vite config
```

## Setup Instructions

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (you can use Vercel Postgres, Neon, or local PostgreSQL)

### API Setup

1. Navigate to the API directory:
```bash
cd api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
DATABASE_URL=your_postgresql_connection_string
API_SECRET=your_secret_key_here
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

### Webapp Setup

1. Navigate to the webapp directory:
```bash
cd webapp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_API_SECRET=your_secret_key_here
```

4. Start the development server:
```bash
npm run dev
```

The webapp will be available at `http://localhost:5173`

## API Endpoints

### GET /api/v1/sensors
Get all sensor readings or filter by sensor name/type.

Query parameters:
- `name` (optional): Filter by sensor name
- `type` (optional): Filter by sensor type

Example:
```bash
curl -H "Authorization: Bearer your_secret_key" \
  http://localhost:3000/api/v1/sensors?name=Temperature
```

### POST /api/v1/sensors
Create a new sensor reading.

Request body:
```json
{
  "sensorName": "Temperature",
  "sensorType": "DHT22",
  "value": 25.5,
  "unit": "°C"
}
```

Example:
```bash
curl -X POST http://localhost:3000/api/v1/sensors \
  -H "Authorization: Bearer your_secret_key" \
  -H "Content-Type: application/json" \
  -d '{"sensorName":"Temperature","sensorType":"DHT22","value":25.5,"unit":"°C"}'
```

## Deployment to Vercel

### Deploy API

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the root directory to `api`
4. Add environment variables in Vercel:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `API_SECRET`: Your secret key
5. Deploy!

### Deploy Webapp

1. In the same project, add a new deployment
2. Set the root directory to `webapp`
3. Add environment variables:
   - `VITE_API_URL`: Your deployed API URL
   - `VITE_API_SECRET`: Your secret key
4. Deploy!

## Technologies Used

### Backend
- **Hono**: Fast, lightweight web framework
- **Drizzle ORM**: Type-safe ORM for PostgreSQL
- **PostgreSQL**: Relational database
- **Zod**: Schema validation
- **TypeScript**: Type safety

### Frontend
- **React 19**: UI library
- **Vite**: Build tool
- **Recharts**: Chart library
- **TanStack Query**: Data fetching and caching
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **TypeScript**: Type safety

## License

MIT
