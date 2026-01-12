import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema.js";

const db = drizzle(sql, {
  casing: "snake_case",
  schema,
});

export default db;
