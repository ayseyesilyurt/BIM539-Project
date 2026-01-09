import { createOrderSchema, updateOrderSchema } from "../../src/validators/orders.schema.js";

describe("orders.schema (unit)", () => {
  test("createOrderSchema: valid payload passes", () => {
    const parsed = createOrderSchema.safeParse({
      userId: 1,
      total: 50.25,
      status: "pending",
    });
    expect(parsed.success).toBe(true);
  });

  test("createOrderSchema: invalid status fails", () => {
    const parsed = createOrderSchema.safeParse({
      userId: 1,
      total: 10,
      status: "wrong-status",
    });
    expect(parsed.success).toBe(false);
  });

  test("updateOrderSchema: empty body fails", () => {
    const parsed = updateOrderSchema.safeParse({});
    expect(parsed.success).toBe(false);
  });
});