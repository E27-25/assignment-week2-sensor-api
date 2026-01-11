# Webapp

Frontend React application for the Sensor monitoring dashboard.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_API_SECRET=your_secret_key
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Features

- Real-time sensor data visualization
- Auto-refreshing charts (every 5 seconds)
- Responsive design
- Modern UI with Tailwind CSS
