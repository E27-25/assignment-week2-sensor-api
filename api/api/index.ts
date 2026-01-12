import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import apiRouter from "../src/routes/api.js";

export const config = {
  runtime: "edge",
};

const app = new Hono();

// CORS middleware
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Mount API routes at /v1 (not /api/v1 since we're already under /api)
app.route("/v1", apiRouter);

// Root endpoint
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

export default handle(app);
