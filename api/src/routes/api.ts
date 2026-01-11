import { Hono } from "hono";
import sensorsRouter from "./sensors.js";

declare global {
  interface BigInt {
    toJSON(): Number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this);
};

const apiRouter = new Hono();

// Health check endpoint
apiRouter.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mount sensors routes
apiRouter.route("/sensors", sensorsRouter);

export default apiRouter;
