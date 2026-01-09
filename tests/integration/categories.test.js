import request from "supertest";
import { app } from "../../src/app.js";
import { cleanupDb } from "../helpers/dbCleanup.js";

beforeEach(async () => {
  await cleanupDb();
});

describe("Categories API (integration)", () => {
  test("POST /api/categories -> 201 creates category", async () => {
    const res = await request(app)
      .post("/api/categories")
      .send({ name: "Laptops" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("Laptops");
  });

  test("POST /api/categories duplicate name -> 400", async () => {
    await request(app).post("/api/categories").send({ name: "Laptops" });

    const res = await request(app).post("/api/categories").send({ name: "Laptops" });
    expect(res.status).toBe(400);
  });
  test("GET /api/categories -> 200 returns list", async () => {
  await request(app).post("/api/categories").send({ name: "C1" });
  const res = await request(app).get("/api/categories");

  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(1);
});

test("GET /api/categories/:id -> 200 returns category", async () => {
  const created = await request(app).post("/api/categories").send({ name: "C2" });
  const res = await request(app).get(`/api/categories/${created.body.id}`);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe("C2");
});

});


describe("Categories API (integration) - extra coverage", () => {
  test("GET /api/categories/:id -> 404 not found", async () => {
    const res = await request(app).get("/api/categories/999999");
    expect(res.status).toBe(404);
  });

  test("PATCH /api/categories/:id -> 200 updates category", async () => {
    const created = await request(app).post("/api/categories").send({ name: "OldName" });
    expect(created.status).toBe(201);

    const updated = await request(app)
      .patch(`/api/categories/${created.body.id}`)
      .send({ name: "NewName" });

    expect(updated.status).toBe(200);
    expect(updated.body.name).toBe("NewName");
  });

  test("DELETE /api/categories/:id -> 200 deletes category", async () => {
    const created = await request(app).post("/api/categories").send({ name: "ToDelete" });
    expect(created.status).toBe(201);

    const del = await request(app).delete(`/api/categories/${created.body.id}`);
    expect(del.status).toBe(200);

    const after = await request(app).get(`/api/categories/${created.body.id}`);
    expect(after.status).toBe(404);
  });
});