import { Hono } from "hono";
import drizzle from "../db/drizzle.js";
import { sensorReadings } from "../db/schema.js";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const sensorsRouter = new Hono();

// Get all sensor readings with optional filters
sensorsRouter.get(
  "/",
  zValidator(
    "query",
    z.object({
      name: z.string().optional(),
      type: z.string().optional(),
      limit: z.string().optional().transform((val) => (val ? parseInt(val) : 100)),
    })
  ),
  async (c) => {
    const { name, type, limit } = c.req.valid("query");

    const filters = [];
    if (name) {
      filters.push(eq(sensorReadings.sensorName, name));
    }
    if (type) {
      filters.push(eq(sensorReadings.sensorType, type));
    }

    let query = drizzle.select().from(sensorReadings).orderBy(desc(sensorReadings.timestamp));

    if (filters.length > 0) {
      query = query.where(and(...filters)) as any;
    }

    const result = await query.limit(limit);

    return c.json(result);
  }
);

// Get a single sensor reading by ID
sensorsRouter.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const result = await drizzle
    .select()
    .from(sensorReadings)
    .where(eq(sensorReadings.id, id))
    .limit(1);

  if (result.length === 0) {
    return c.json({ error: "Sensor reading not found" }, 404);
  }

  return c.json(result[0]);
});

// Create a new sensor reading
sensorsRouter.post(
  "/",
  zValidator(
    "json",
    z.object({
      sensorName: z.string().min(1),
      sensorType: z.string().min(1),
      value: z.number(),
      unit: z.string().optional(),
    })
  ),
  async (c) => {
    const data = c.req.valid("json");
    const result = await drizzle.insert(sensorReadings).values(data).returning();

    return c.json({ success: true, data: result[0] }, 201);
  }
);

// Delete a sensor reading
sensorsRouter.delete("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const result = await drizzle
    .delete(sensorReadings)
    .where(eq(sensorReadings.id, id))
    .returning();

  if (result.length === 0) {
    return c.json({ error: "Sensor reading not found" }, 404);
  }

  return c.json({ success: true, message: "Sensor reading deleted" });
});

export default sensorsRouter;
