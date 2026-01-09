import request from "supertest";
import { app } from "../../src/app.js";
import { cleanupDb } from "../helpers/dbCleanup.js";

beforeEach(async () => {
  await cleanupDb();
});

describe("E2E flows", () => {
  test("Flow1: create category -> create product -> list products", async () => {
    const cat = await request(app).post("/api/categories").send({ name: "Phones" });
    expect(cat.status).toBe(201);

    const prod = await request(app)
      .post("/api/products")
      .send({ name: "iPhone", price: 1000, categoryId: cat.body.id });

    expect(prod.status).toBe(201);

    const list = await request(app).get("/api/products");
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body.length).toBe(1);
    expect(list.body[0].categoryName).toBe("Phones");
  });

  test("Flow2: create user -> create order -> list orders (join fields)", async () => {
    const user = await request(app)
      .post("/api/users")
      .send({ email: "flow2@test.com", fullName: "Flow Two" });
    expect(user.status).toBe(201);

    const order = await request(app)
      .post("/api/orders")
      .send({ userId: user.body.id, total: 50.25, status: "pending" });

    expect(order.status).toBe(201);

    const list = await request(app).get("/api/orders");
    expect(list.status).toBe(200);
    expect(list.body.length).toBe(1);
    expect(list.body[0].userEmail).toBe("flow2@test.com");
  });

  test("Flow3: create user + category + product -> create review -> list reviews (join fields)", async () => {
    const user = await request(app)
      .post("/api/users")
      .send({ email: "flow3@test.com", fullName: "Flow Three" });
    expect(user.status).toBe(201);

    const cat = await request(app).post("/api/categories").send({ name: "Laptops" });
    expect(cat.status).toBe(201);

    const prod = await request(app)
      .post("/api/products")
      .send({ name: "MacBook", price: 10, categoryId: cat.body.id });
    expect(prod.status).toBe(201);

    const rev = await request(app)
      .post("/api/reviews")
      .send({ userId: user.body.id, productId: prod.body.id, rating: 5, comment: "Nice" });

    expect(rev.status).toBe(201);

    const list = await request(app).get("/api/reviews");
    expect(list.status).toBe(200);
    expect(list.body.length).toBe(1);
    expect(list.body[0].userEmail).toBe("flow3@test.com");
    expect(list.body[0].productName).toBe("MacBook");
  });

  test("Flow4: duplicate review (same user+product) -> 400", async () => {
  const user = await request(app)
    .post("/api/users")
    .send({ email: "flow4@test.com", fullName: "Flow Four" });
  expect(user.status).toBe(201);

  const cat = await request(app).post("/api/categories").send({ name: "Accessories" });
  expect(cat.status).toBe(201);

  const prod = await request(app)
    .post("/api/products")
    .send({ name: "Product P", price: 10, categoryId: cat.body.id });

  // Eğer yine 400 olursa sebebini hemen görelim:
  if (prod.status !== 201) console.log("PRODUCT CREATE ERROR:", prod.body);

  expect(prod.status).toBe(201);

  const first = await request(app)
    .post("/api/reviews")
    .send({ userId: user.body.id, productId: prod.body.id, rating: 4, comment: "ok" });

  if (first.status !== 201) console.log("FIRST REVIEW ERROR:", first.body);

  expect(first.status).toBe(201);

  const second = await request(app)
    .post("/api/reviews")
    .send({ userId: user.body.id, productId: prod.body.id, rating: 5, comment: "again" });

  expect(second.status).toBe(400);
});

  test("Flow5: review with invalid product -> 400", async () => {
    const user = await request(app)
      .post("/api/users")
      .send({ email: "flow5@test.com", fullName: "Flow Five" });
    expect(user.status).toBe(201);

    const res = await request(app)
      .post("/api/reviews")
      .send({ userId: user.body.id, productId: 999999, rating: 3 });

    expect(res.status).toBe(400);
  });
});