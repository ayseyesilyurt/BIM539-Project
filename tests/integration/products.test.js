import request from "supertest";
import { app } from "../../src/app.js";
import { cleanupDb } from "../helpers/dbCleanup.js";

beforeEach(async () => {
  await cleanupDb();
});

describe("Products API (integration)", () => {
  test("POST /api/products -> 201 with valid categoryId", async () => {
    const cat = await request(app).post("/api/categories").send({ name: "Phones" });
    expect(cat.status).toBe(201);

    const res = await request(app)
      .post("/api/products")
      .send({ name: "iPhone", price: 1000, categoryId: cat.body.id });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("iPhone");
    expect(res.body.categoryId).toBe(cat.body.id);
  });

  test("POST /api/products -> 400 with invalid categoryId", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "Ghost", price: 10, categoryId: 999999 });

    expect(res.status).toBe(400);
  });
  test("GET /api/products -> 200 returns list", async () => {
  const cat = await request(app).post("/api/categories").send({ name: "Gadgets" });

  await request(app)
    .post("/api/products")
    .send({ name: "Gadget One", price: 10, categoryId: cat.body.id });

  const res = await request(app).get("/api/products");
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("GET /api/products/:id -> 200 returns product", async () => {
  const cat = await request(app).post("/api/categories").send({ name: "Devices" });

  const created = await request(app)
    .post("/api/products")
    .send({ name: "Device One", price: 10, categoryId: cat.body.id });

  const res = await request(app).get(`/api/products/${created.body.id}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe("Device One");
});

});

describe("Products API (integration) - extra coverage", () => {
  test("GET /api/products/:id -> 404 not found", async () => {
    const res = await request(app).get("/api/products/999999");
    expect(res.status).toBe(404);
  });

  test("PATCH /api/products/:id -> 200 updates product", async () => {
    const cat = await request(app).post("/api/categories").send({ name: "UpdateCat" });
    expect(cat.status).toBe(201);

    const created = await request(app)
      .post("/api/products")
      .send({ name: "OldP", price: 10, categoryId: cat.body.id });
    expect(created.status).toBe(201);

    const updated = await request(app)
      .patch(`/api/products/${created.body.id}`)
      .send({ name: "NewP", price: 20 });

    expect(updated.status).toBe(200);
    expect(updated.body.name).toBe("NewP");
    expect(Number(updated.body.price)).toBeCloseTo(20);
  });

  test("DELETE /api/products/:id -> 200 deletes product", async () => {
    const cat = await request(app).post("/api/categories").send({ name: "DelCat" });
    expect(cat.status).toBe(201);

    const created = await request(app)
      .post("/api/products")
      .send({ name: "DelP", price: 1, categoryId: cat.body.id });
    expect(created.status).toBe(201);

    const del = await request(app).delete(`/api/products/${created.body.id}`);
    expect(del.status).toBe(200);

    const after = await request(app).get(`/api/products/${created.body.id}`);
    expect(after.status).toBe(404);
  });
});
