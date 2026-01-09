import { query } from "../../src/config/db.js";

export async function cleanupDb() {
  await query("DELETE FROM reviews");
  await query("DELETE FROM orders");
  await query("DELETE FROM products");
  await query("DELETE FROM categories");
  await query("DELETE FROM users");
}