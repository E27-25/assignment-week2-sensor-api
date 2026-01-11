import { Hono } from "hono";
import { cors } from "hono/cors";
import apiRouter from "./routes/api.js";

const app = new Hono();

// CORS middleware for production
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
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

export default app;
