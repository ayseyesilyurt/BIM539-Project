import dotenv from "dotenv";
dotenv.config();

function req(name) {
  const v = process.env[name];
  if (v === undefined || v === null || v === "") {
    throw new Error(`Missing env: ${name}`);
  }
  return v;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),

  db: {
    host: req("PG_HOST"),
    port: Number(req("PG_PORT")),
    user: req("PG_USER"),
    password: String(req("PG_PASSWORD")),  
    database: req("PG_DATABASE"),
  },
};