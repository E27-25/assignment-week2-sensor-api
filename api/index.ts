import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import apiRouter from "./src/routes/api.js";

const app = new Hono().basePath("/api");

// CORS middleware for production
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "*"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Mount API routes at /v1
app.route("/v1", apiRouter);

// Root endpoint at /api
app.get("/", (c) => {
  return c.json({
    message: "Sensor API - Assignment Week 2",
    version: "1.0.0",
    endpoints: {
      health: "/api/v1/health",
      sensors: "/api/v1/sensors",
    },
  });
});

// Export for Vercel
export default handle(app);
