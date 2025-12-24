import { query } from "../config/db.js";

export async function findAllOrders() {
  const { rows } = await query(
    `SELECT 
        o.id,
        o.user_id AS "userId",
        u.email AS "userEmail",
        u.full_name AS "userFullName",
        o.total,
        o.status,
        o.created_at AS "createdAt"
     FROM orders o
     JOIN users u ON u.id = o.user_id
     ORDER BY o.id ASC`
  );
  return rows;
}

export async function findOrderById(id) {
  const { rows } = await query(
    `SELECT 
        o.id,
        o.user_id AS "userId",
        u.email AS "userEmail",
        u.full_name AS "userFullName",
        o.total,
        o.status,
        o.created_at AS "createdAt"
     FROM orders o
     JOIN users u ON u.id = o.user_id
     WHERE o.id = $1`,
    [id]
  );
  return rows[0] || null;
}

export async function createOrder({ userId, total, status }) {
  const { rows } = await query(
    `INSERT INTO orders (user_id, total, status)
     VALUES ($1, $2, $3)
     RETURNING id, user_id AS "userId", total, status, created_at AS "createdAt"`,
    [userId, total, status ?? "pending"]
  );
  return rows[0];
}

export async function updateOrder(id, data) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.userId !== undefined) {
    fields.push(`user_id = $${idx++}`);
    values.push(data.userId);
  }
  if (data.total !== undefined) {
    fields.push(`total = $${idx++}`);
    values.push(data.total);
  }
  if (data.status !== undefined) {
    fields.push(`status = $${idx++}`);
    values.push(data.status);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const { rows } = await query(
    `UPDATE orders
     SET ${fields.join(", ")}
     WHERE id = $${idx}
     RETURNING id, user_id AS "userId", total, status, created_at AS "createdAt"`,
    values
  );

  return rows[0] || null;
}

export async function deleteOrder(id) {
  const { rowCount } = await query(`DELETE FROM orders WHERE id = $1`, [id]);
  return rowCount > 0;
}

// FK check: user var mı?
export async function userExists(userId) {
  const { rows } = await query(`SELECT 1 FROM users WHERE id = $1`, [userId]);
  return rows.length > 0;
}