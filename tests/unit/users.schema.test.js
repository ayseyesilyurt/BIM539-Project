import { createUserSchema, updateUserSchema } from "../../src/validators/users.schema.js";

describe("users.schema (unit)", () => {
  test("createUserSchema: valid payload passes", () => {
    const parsed = createUserSchema.safeParse({
      email: "u1@test.com",
      fullName: "Test User",
    });
    expect(parsed.success).toBe(true);
  });

  test("createUserSchema: invalid email fails", () => {
    const parsed = createUserSchema.safeParse({
      email: "not-an-email",
      fullName: "Test User",
    });
    expect(parsed.success).toBe(false);
  });

  test("createUserSchema: missing fullName fails", () => {
    const parsed = createUserSchema.safeParse({
      email: "u2@test.com",
    });
    expect(parsed.success).toBe(false);
  });

  test("updateUserSchema: empty body fails", () => {
    const parsed = updateUserSchema.safeParse({});
    expect(parsed.success).toBe(false);
  });
});