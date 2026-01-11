# API

Backend API for the Sensor monitoring application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```env
DATABASE_URL=your_postgresql_connection_string
API_SECRET=your_secret_key
```

3. Run migrations:
```bash
npm run drizzle:generate
npm run drizzle:migrate
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/v1/health` - Health check
- `GET /api/v1/sensors` - Get all sensor readings
- `POST /api/v1/sensors` - Create sensor reading
- `GET /api/v1/sensors/:id` - Get sensor reading by ID
- `DELETE /api/v1/sensors/:id` - Delete sensor reading
