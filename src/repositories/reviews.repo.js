import { query } from "../config/db.js";

export async function findAllReviews() {
  const { rows } = await query(
    `SELECT
        r.id,
        r.user_id AS "userId",
        u.email AS "userEmail",
        r.product_id AS "productId",
        p.name AS "productName",
        r.rating,
        r.comment,
        r.created_at AS "createdAt"
     FROM reviews r
     JOIN users u ON u.id = r.user_id
     JOIN products p ON p.id = r.product_id
     ORDER BY r.id ASC`
  );
  return rows;
}

export async function findReviewById(id) {
  const { rows } = await query(
    `SELECT
        r.id,
        r.user_id AS "userId",
        u.email AS "userEmail",
        r.product_id AS "productId",
        p.name AS "productName",
        r.rating,
        r.comment,
        r.created_at AS "createdAt"
     FROM reviews r
     JOIN users u ON u.id = r.user_id
     JOIN products p ON p.id = r.product_id
     WHERE r.id = $1`,
    [id]
  );
  return rows[0] || null;
}

export async function createReview({ userId, productId, rating, comment }) {
  const { rows } = await query(
    `INSERT INTO reviews (user_id, product_id, rating, comment)
     VALUES ($1, $2, $3, $4)
     RETURNING id, user_id AS "userId", product_id AS "productId", rating, comment, created_at AS "createdAt"`,
    [userId, productId, rating, comment ?? null]
  );
  return rows[0];
}

export async function updateReview(id, data) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.rating !== undefined) {
    fields.push(`rating = $${idx++}`);
    values.push(data.rating);
  }
  if (data.comment !== undefined) {
    fields.push(`comment = $${idx++}`);
    values.push(data.comment);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const { rows } = await query(
    `UPDATE reviews
     SET ${fields.join(", ")}
     WHERE id = $${idx}
     RETURNING id, user_id AS "userId", product_id AS "productId", rating, comment, created_at AS "createdAt"`,
    values
  );

  return rows[0] || null;
}

export async function deleteReview(id) {
  const { rowCount } = await query(`DELETE FROM reviews WHERE id = $1`, [id]);
  return rowCount > 0;
}

// FK check'ler
export async function userExists(userId) {
  const { rows } = await query(`SELECT 1 FROM users WHERE id = $1`, [userId]);
  return rows.length > 0;
}

export async function productExists(productId) {
  const { rows } = await query(`SELECT 1 FROM products WHERE id = $1`, [productId]);
  return rows.length > 0;
}