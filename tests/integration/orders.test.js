import request from "supertest";
import { app } from "../../src/app.js";
import { cleanupDb } from "../helpers/dbCleanup.js";

beforeEach(async () => {
  await cleanupDb();
});

describe("Orders API (integration)", () => {
  test("POST /api/orders -> 201 with valid userId", async () => {
    const user = await request(app)
      .post("/api/users")
      .send({ email: "o1@test.com", fullName: "Order User" });

    expect(user.status).toBe(201);

    const res = await request(app)
      .post("/api/orders")
      .send({ userId: user.body.id, total: 50.25, status: "pending" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.userId).toBe(user.body.id);
    expect(Number(res.body.total)).toBeCloseTo(50.25);
    expect(res.body.status).toBe("pending");
  });

  test("POST /api/orders -> 400 with invalid userId", async () => {
    const res = await request(app)
      .post("/api/orders")
      .send({ userId: 999999, total: 10, status: "pending" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");

  });
  test("GET /api/orders -> 200 returns list", async () => {
  const user = await request(app)
    .post("/api/users")
    .send({ email: "olist@test.com", fullName: "Order List" });

  await request(app)
    .post("/api/orders")
    .send({ userId: user.body.id, total: 10, status: "pending" });

  const res = await request(app).get("/api/orders");
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("GET /api/orders/:id -> 200 returns order", async () => {
  const user = await request(app)
    .post("/api/users")
    .send({ email: "oget@test.com", fullName: "Order Get" });

  const created = await request(app)
    .post("/api/orders")
    .send({ userId: user.body.id, total: 10, status: "pending" });

  const res = await request(app).get(`/api/orders/${created.body.id}`);
  expect(res.status).toBe(200);
  expect(res.body.userId).toBe(user.body.id);
});

});

describe("Orders API (integration) - extra coverage", () => {
  test("GET /api/orders/:id -> 404 not found", async () => {
    const res = await request(app).get("/api/orders/999999");
    expect(res.status).toBe(404);
  });

  test("PATCH /api/orders/:id -> 200 updates order status", async () => {
    const user = await request(app).post("/api/users").send({ email: "o_up@test.com", fullName: "O Up" });
    expect(user.status).toBe(201);

    const created = await request(app)
      .post("/api/orders")
      .send({ userId: user.body.id, total: 10.5, status: "pending" });
    expect(created.status).toBe(201);

    const updated = await request(app)
      .patch(`/api/orders/${created.body.id}`)
      .send({ status: "paid" });

    expect(updated.status).toBe(200);
    expect(updated.body.status).toBe("paid");
  });

  test("PATCH /api/orders/:id -> 400 invalid status", async () => {
    const user = await request(app).post("/api/users").send({ email: "o_bad@test.com", fullName: "O Bad" });
    expect(user.status).toBe(201);

    const created = await request(app)
      .post("/api/orders")
      .send({ userId: user.body.id, total: 10.5, status: "pending" });
    expect(created.status).toBe(201);

    const bad = await request(app)
      .patch(`/api/orders/${created.body.id}`)
      .send({ status: "not-a-valid-status" });

    expect(bad.status).toBe(400);
  });

  test("DELETE /api/orders/:id -> 200 deletes order", async () => {
    const user = await request(app).post("/api/users").send({ email: "o_del@test.com", fullName: "O Del" });
    expect(user.status).toBe(201);

    const created = await request(app)
      .post("/api/orders")
      .send({ userId: user.body.id, total: 5, status: "pending" });
    expect(created.status).toBe(201);

    const del = await request(app).delete(`/api/orders/${created.body.id}`);
    expect(del.status).toBe(200);

    const after = await request(app).get(`/api/orders/${created.body.id}`);
    expect(after.status).toBe(404);
  });
});
