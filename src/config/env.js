// src/config/env.js
import dotenv from "dotenv";

dotenv.config();

function pick(...names) {
  for (const n of names) {
    const v = process.env[n];
    if (v !== undefined && v !== null && String(v).trim() !== "") return String(v);
  }
  return undefined;
}

function must(...names) {
  const v = pick(...names);
  if (!v) throw new Error(`Missing env: ${names.join(" or ")}`);
  return v;
}

function toInt(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

const nodeEnv = pick("NODE_ENV") || "development";
const isTest = nodeEnv === "test";

 
const port = toInt(pick("PORT", "API_PORT"), 3000);

 
const host = must("DB_HOST", "PG_HOST");
const dbPort = toInt(must("DB_PORT", "PG_PORT"), 5432);
const user = must("DB_USER", "PG_USER");

// Şifre: testte zorunlu tutmak istemiyorsan must yerine pick yapabilirsin.
// Ama sende var: DB_PASSWORD=123 -> sorun yok.
const password = must("DB_PASSWORD", "PG_PASSWORD");

// DB adı: testte TEST_DB_NAME varsa onu al, yoksa DB_NAME
const database = isTest
  ? must("TEST_DB_NAME", "DB_NAME", "PG_DATABASE")
  : must("DB_NAME", "PG_DATABASE");

export const env = {
  nodeEnv,
  isTest,
  port,
  db: {
    host,
    port: dbPort,
    user,
    password,
    database,
  },
};
