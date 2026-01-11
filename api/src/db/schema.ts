import { pgTable, serial, text, real, timestamp } from "drizzle-orm/pg-core";

export const sensorReadings = pgTable("sensor_readings", {
  id: serial("id").primaryKey(),
  sensorName: text("sensor_name").notNull(),
  sensorType: text("sensor_type").notNull(),
  value: real("value").notNull(),
  unit: text("unit"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type SensorReading = typeof sensorReadings.$inferSelect;
export type NewSensorReading = typeof sensorReadings.$inferInsert;
