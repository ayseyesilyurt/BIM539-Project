import { createReviewSchema, updateReviewSchema } from "../../src/validators/reviews.schema.js";

describe("reviews.schema (unit)", () => {
  test("createReviewSchema: valid payload passes", () => {
    const parsed = createReviewSchema.safeParse({
      userId: 1,
      productId: 1,
      rating: 5,
      comment: "Great!"
    });
    expect(parsed.success).toBe(true);
  });

  test("createReviewSchema: rating out of range fails", () => {
    const parsed = createReviewSchema.safeParse({
      userId: 1,
      productId: 1,
      rating: 6
    });
    expect(parsed.success).toBe(false);
  });

  test("updateReviewSchema: empty body fails", () => {
    const parsed = updateReviewSchema.safeParse({});
    expect(parsed.success).toBe(false);
  });
  
});