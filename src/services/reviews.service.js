import * as repo from "../repositories/reviews.repo.js";
import { createReviewSchema, updateReviewSchema } from "../validators/reviews.schema.js";

export async function listReviews() {
  return repo.findAllReviews();
}

export async function getReview(id) {
  return repo.findReviewById(id);
}

export async function addReview(payload) {
  const parsed = createReviewSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: { status: 400, message: parsed.error.issues } };
  }

  const userOk = await repo.userExists(parsed.data.userId);
  if (!userOk) return { error: { status: 400, message: "User does not exist" } };

  const productOk = await repo.productExists(parsed.data.productId);
  if (!productOk) return { error: { status: 400, message: "Product does not exist" } };

  try {
    const review = await repo.createReview(parsed.data);
    return { data: review };
  } catch (e) {
    // UNIQUE(user_id, product_id) ihlali burada patlar
    return { error: { status: 400, message: "User already reviewed this product" } };
  }
}

export async function editReview(id, payload) {
  const parsed = updateReviewSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: { status: 400, message: parsed.error.issues } };
  }

  const updated = await repo.updateReview(id, parsed.data);
  if (!updated) return { error: { status: 404, message: "Review not found" } };

  return { data: updated };
}

export async function removeReview(id) {
  const ok = await repo.deleteReview(id);
  if (!ok) return { error: { status: 404, message: "Review not found" } };
  return { data: { deleted: true } };
}