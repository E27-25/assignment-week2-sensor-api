import { Hono } from "hono";
import sensorsRouter from "./sensors.js";
import { bearerAuth } from "hono/bearer-auth";
import { env } from "hono/adapter";

declare global {
  interface BigInt {
    toJSON(): Number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this);
};

const apiRouter = new Hono();

// Bearer token authentication middleware
apiRouter.use(
  "*",
  bearerAuth({
    verifyToken: async (token, c) => {
      const { API_SECRET } = env<{ API_SECRET: string }>(c);
      return token === API_SECRET;
    },
  })
);

// Health check endpoint (no auth required)
apiRouter.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mount sensors routes
apiRouter.route("/sensors", sensorsRouter);

export default apiRouter;
