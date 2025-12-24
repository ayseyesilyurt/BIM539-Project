import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

const database = env.nodeEnv === "test" ? env.testDbName : env.dbName;

export const pool = new Pool({
  host: env.dbHost,
  port: Number(env.dbPort),
  user: env.dbUser,
  password: env.dbPassword,
  database
});

export async function query(text, params) {
  return pool.query(text, params);
}