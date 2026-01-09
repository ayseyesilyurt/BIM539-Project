import { closeDb } from "../src/config/db.js";

afterAll(async () => {
  await closeDb();
});