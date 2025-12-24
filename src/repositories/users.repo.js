import { query } from "../config/db.js";

export async function findAllUsers() {
  const { rows } = await query(
    `SELECT id, email, full_name AS "fullName", created_at AS "createdAt"
     FROM users
     ORDER BY id ASC`
  );
  return rows;
}

export async function findUserById(id) {
  const { rows } = await query(
    `SELECT id, email, full_name AS "fullName", created_at AS "createdAt"
     FROM users
     WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}

export async function createUser({ email, fullName }) {
  const { rows } = await query(
    `INSERT INTO users (email, full_name)
     VALUES ($1, $2)
     RETURNING id, email, full_name AS "fullName", created_at AS "createdAt"`,
    [email, fullName]
  );
  return rows[0];
}

export async function updateUser(id, data) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.email !== undefined) {
    fields.push(`email = $${idx++}`);
    values.push(data.email);
  }
  if (data.fullName !== undefined) {
    fields.push(`full_name = $${idx++}`);
    values.push(data.fullName);
  }

  // hiçbir field yoksa update yapma
  if (fields.length === 0) return null;

  values.push(id);

  const { rows } = await query(
    `UPDATE users
     SET ${fields.join(", ")}
     WHERE id = $${idx}
     RETURNING id, email, full_name AS "fullName", created_at AS "createdAt"`,
    values
  );

  return rows[0] || null;
}

export async function deleteUser(id) {
  const { rowCount } = await query(`DELETE FROM users WHERE id = $1`, [id]);
  return rowCount > 0;
}