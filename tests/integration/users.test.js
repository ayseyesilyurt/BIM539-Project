import request from "supertest";
import { app } from "../../src/app.js";
import { cleanupDb } from "../helpers/dbCleanup.js";

beforeEach(async () => {
  await cleanupDb();
});

describe("Users API (integration)", () => {
  test("POST /api/users -> 201 creates user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ email: "u1@test.com", fullName: "User One" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.email).toBe("u1@test.com");
    expect(res.body.fullName).toBe("User One");
  });

  test("GET /api/users -> 200 returns list", async () => {
    await request(app)
      .post("/api/users")
      .send({ email: "u2@test.com", fullName: "User Two" });

    const res = await request(app).get("/api/users");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].email).toBe("u2@test.com");
  });

  test("POST /api/users duplicate email -> 400", async () => {
    await request(app)
      .post("/api/users")
      .send({ email: "dup@test.com", fullName: "A User" });

    const res = await request(app)
      .post("/api/users")
      .send({ email: "dup@test.com", fullName: "B User" });

    expect(res.status).toBe(400);
  });

  test("GET /api/users/:id not found -> 404", async () => {
    const res = await request(app).get("/api/users/999999");
    expect(res.status).toBe(404);
  });
  test("GET /api/users/:id -> 200 returns user", async () => {
  const created = await request(app)
    .post("/api/users")
    .send({ email: "get1@test.com", fullName: "Get User" });

  const res = await request(app).get(`/api/users/${created.body.id}`);
  expect(res.status).toBe(200);
  expect(res.body.email).toBe("get1@test.com");
});

test("PATCH /api/users/:id -> 200 updates user", async () => {
  const created = await request(app)
    .post("/api/users")
    .send({ email: "patch1@test.com", fullName: "Patch User" });

  const res = await request(app)
    .patch(`/api/users/${created.body.id}`)
    .send({ fullName: "Patch User Updated" });

  expect(res.status).toBe(200);
  expect(res.body.fullName).toBe("Patch User Updated");
});
test("DELETE /api/users/:id -> 200 deletes user", async () => { //delete test
  const created = await request(app)
    .post("/api/users")
    .send({ email: "del@test.com", fullName: "Del User" });

  const del = await request(app).delete(`/api/users/${created.body.id}`);
  expect(del.status).toBe(200);

  const after = await request(app).get(`/api/users/${created.body.id}`);
  expect(after.status).toBe(404);
});

});