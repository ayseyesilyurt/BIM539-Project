import * as service from "../services/reviews.service.js";

export async function list(req, res, next) {
  try {
    const reviews = await service.listReviews();
    res.status(200).json(reviews);
  } catch (e) {
    next(e);
  }
}

export async function getById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const review = await service.getReview(id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const body = req.body ?? {};

    const payload = {
      userId: body.userId ?? body.user_id,
      productId: body.productId ?? body.product_id,
      rating: body.rating,
      comment: body.comment,
    };

    const result = await service.addReview(payload);

    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.status(201).json(result.data);
  } catch (e) {
    // Postgres unique ihlali (reviews uniq_user_product)
    if (String(e?.code) === "23505") {
      return res.status(400).json({ message: "duplicate review" });
    }
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await service.editReview(id, req.body);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(200).json(result.data);
  } catch (e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await service.removeReview(id);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(200).json(result.data);
  } catch (e) {
    next(e);
  }
}