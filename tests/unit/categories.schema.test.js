import { createCategorySchema, updateCategorySchema } from "../../src/validators/categories.schema.js";

describe("categories.schema (unit)", () => {
  test("createCategorySchema: valid payload passes", () => {
    const parsed = createCategorySchema.safeParse({ name: "Laptops" });
    expect(parsed.success).toBe(true);
  });

  test("createCategorySchema: too short name fails", () => {
    const parsed = createCategorySchema.safeParse({ name: "A" });
    expect(parsed.success).toBe(false);
  });

  test("updateCategorySchema: empty body fails", () => {
    const parsed = updateCategorySchema.safeParse({});
    expect(parsed.success).toBe(false);
  });
  
});