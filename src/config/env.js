// src/config/env.js
import dotenv from "dotenv";
dotenv.config();

function pick(...names) {
  for (const n of names) {
    const v = process.env[n];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function req(...names) {
  const v = pick(...names);
  if (v === undefined) {
    throw new Error(`Missing env: ${names.join(" or ")}`);
  }
  return v;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),

  db: {
    host: req("PG_HOST", "DB_HOST"),
    port: Number(req("PG_PORT", "DB_PORT")),
    user: req("PG_USER", "DB_USER"),
    password: String(req("PG_PASSWORD", "DB_PASSWORD")),
    // testte kalite_test_db kullanmak için:
    database:
      (process.env.NODE_ENV === "test"
        ? pick("PG_DATABASE", "TEST_DB_NAME")
        : pick("PG_DATABASE", "DB_NAME")) || req("PG_DATABASE", "DB_NAME", "TEST_DB_NAME"),
  },
};