import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

const pool = new Pool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
});

export function query(text, params) {
  return pool.query(text, params);
}

export async function closeDb() {
  await pool.end();
}