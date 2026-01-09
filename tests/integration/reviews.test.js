import request from "supertest";
import { app } from "../../src/app.js";
import { cleanupDb } from "../helpers/dbCleanup.js";

beforeEach(async () => {
  await cleanupDb();
});

describe("Reviews API (integration)", () => {
  test("POST /api/reviews -> 201 creates review", async () => {
    const user = await request(app)
      .post("/api/users")
      .send({ email: "rev@test.com", fullName: "Reviewer" });

    const cat = await request(app).post("/api/categories").send({ name: "ReviewCat" });

    const prod = await request(app)
      .post("/api/products")
      .send({ name: "ReviewProduct", price: 10, categoryId: cat.body.id });

    const res = await request(app)
      .post("/api/reviews")
      .send({ userId: user.body.id, productId: prod.body.id, rating: 5, comment: "Nice" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test("GET /api/reviews -> 200 returns list", async () => {
    const user = await request(app)
      .post("/api/users")
      .send({ email: "rev2@test.com", fullName: "Reviewer2" });

    const cat = await request(app).post("/api/categories").send({ name: "ReviewCat2" });

    const prod = await request(app)
      .post("/api/products")
      .send({ name: "ReviewProduct2", price: 10, categoryId: cat.body.id });

    await request(app)
      .post("/api/reviews")
      .send({ userId: user.body.id, productId: prod.body.id, rating: 4 });

    const res = await request(app).get("/api/reviews");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });
  test("GET /api/reviews/:id -> 200 returns review", async () => {
  const user = await request(app)
    .post("/api/users")
    .send({ email: "rid@test.com", fullName: "Reviewer" });

  const cat = await request(app).post("/api/categories").send({ name: "RCat" });

  const prod = await request(app)
    .post("/api/products")
    .send({ name: "RProd", price: 10, categoryId: cat.body.id });

  const created = await request(app)
    .post("/api/reviews")
    .send({ userId: user.body.id, productId: prod.body.id, rating: 5 });

  const res = await request(app).get(`/api/reviews/${created.body.id}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(created.body.id);
});

test("GET /api/reviews/:id -> 404 not found", async () => {
  const res = await request(app).get("/api/reviews/999999");
  expect(res.status).toBe(404);
});

test("POST /api/reviews duplicate (same user+product) -> 400", async () => {
  const user = await request(app)
    .post("/api/users")
    .send({ email: "dup@test.com", fullName: "Dup Reviewer" });

  const cat = await request(app).post("/api/categories").send({ name: "DupCat" });

  const prod = await request(app)
    .post("/api/products")
    .send({ name: "DupProd", price: 10, categoryId: cat.body.id });

  const first = await request(app)
    .post("/api/reviews")
    .send({ userId: user.body.id, productId: prod.body.id, rating: 4 });

  expect(first.status).toBe(201);

  const second = await request(app)
    .post("/api/reviews")
    .send({ userId: user.body.id, productId: prod.body.id, rating: 5 });

  expect(second.status).toBe(400);
});

test("POST /api/reviews -> 400 invalid rating", async () => {
  const res = await request(app)
    .post("/api/reviews")
    .send({ userId: 1, productId: 1, rating: 10 });

  expect(res.status).toBe(400);
});
});
describe("Reviews API (integration) - extra coverage", () => {
  test("PATCH /api/reviews/:id -> 200 updates review rating", async () => {
    const user = await request(app).post("/api/users").send({ email: "r_up@test.com", fullName: "R Up" });
    const cat = await request(app).post("/api/categories").send({ name: "Rcat" });
    const prod = await request(app).post("/api/products").send({ name: "Rprod", price: 1, categoryId: cat.body.id });

    const created = await request(app)
      .post("/api/reviews")
      .send({ userId: user.body.id, productId: prod.body.id, rating: 4, comment: "ok" });
    expect(created.status).toBe(201);

    const updated = await request(app)
      .patch(`/api/reviews/${created.body.id}`)
      .send({ rating: 5 });

    expect(updated.status).toBe(200);
    expect(updated.body.rating).toBe(5);
  });

  test("DELETE /api/reviews/:id -> 200 deletes review", async () => {
    const user = await request(app).post("/api/users").send({ email: "r_del@test.com", fullName: "R Del" });
    const cat = await request(app).post("/api/categories").send({ name: "Rcat2" });
    const prod = await request(app).post("/api/products").send({ name: "Rprod2", price: 1, categoryId: cat.body.id });

    const created = await request(app)
      .post("/api/reviews")
      .send({ userId: user.body.id, productId: prod.body.id, rating: 3, comment: "x" });
    expect(created.status).toBe(201);

    const del = await request(app).delete(`/api/reviews/${created.body.id}`);
    expect(del.status).toBe(200);

    const after = await request(app).get(`/api/reviews/${created.body.id}`);
    expect(after.status).toBe(404);
  });
});
