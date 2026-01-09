import request from "supertest";
import { app } from "../../src/app.js";

describe("Health API (integration)", () => {
  test("GET /api/health/db -> 200 ok", async () => {
    const res = await request(app).get("/api/health/db");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});