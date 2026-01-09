import { createProductSchema, updateProductSchema } from "../../src/validators/products.schema.js";

describe("products.schema (unit)", () => {
  test("createProductSchema: valid payload passes", () => {
    const parsed = createProductSchema.safeParse({
      name: "MacBook Air",
      price: 10,
      categoryId: 1
    });
    expect(parsed.success).toBe(true);
  });

  test("createProductSchema: negative price fails", () => {
    const parsed = createProductSchema.safeParse({
      name: "Bad Product",
      price: -1,
      categoryId: 1
    });
    expect(parsed.success).toBe(false);
  });

  test("updateProductSchema: empty body fails", () => {
    const parsed = updateProductSchema.safeParse({});
    expect(parsed.success).toBe(false);
  });
  
});