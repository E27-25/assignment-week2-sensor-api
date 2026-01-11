import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import apiRouter from "./routes/api.js";

const app = new Hono();

// CORS middleware
app.use(
  "/api/*",
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Mount API routes
app.route("/api/v1", apiRouter);

// Root endpoint
app.get("/", (c) => {
  return c.json({
    message: "Sensor API - Assignment Week 2",
    version: "1.0.0",
    endpoints: {
      api: "/api/v1",
      health: "/api/v1/health",
      sensors: "/api/v1/sensors",
    },
  });
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`🚀 Server is running on http://localhost:${info.port}`);
  }
);

export default app;
