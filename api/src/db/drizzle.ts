import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.js";

const client = createClient({
  url: process.env.DATABASE_URL as string,
});

const db = drizzle(client, {
  casing: "snake_case",
  schema,
});

export default db;
