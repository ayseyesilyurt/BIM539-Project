import { Pool } from "pg";
import { env } from "./env.js";

const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
});

export const query = (text, params) => pool.query(text, params);
export const closeDb = () => pool.end();