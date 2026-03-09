import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined;
};
const client = globalForDb.client ?? postgres(url);
if (process.env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle({ client });
