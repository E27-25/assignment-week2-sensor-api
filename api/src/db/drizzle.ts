import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

const client = postgres(process.env.DATABASE_URL as string);

const db = drizzle(client, {
  casing: "snake_case",
  schema,
});

export default db;
