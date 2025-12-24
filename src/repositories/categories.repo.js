import { query } from "../config/db.js";

export async function findAllCategories() {
  const { rows } = await query(
    `SELECT id, name, created_at AS "createdAt"
     FROM categories
     ORDER BY id ASC`
  );
  return rows;
}

export async function findCategoryById(id) {
  const { rows } = await query(
    `SELECT id, name, created_at AS "createdAt"
     FROM categories
     WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}

export async function createCategory({ name }) {
  const { rows } = await query(
    `INSERT INTO categories (name)
     VALUES ($1)
     RETURNING id, name, created_at AS "createdAt"`,
    [name]
  );
  return rows[0];
}

export async function updateCategory(id, data) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(data.name);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const { rows } = await query(
    `UPDATE categories
     SET ${fields.join(", ")}
     WHERE id = $${idx}
     RETURNING id, name, created_at AS "createdAt"`,
    values
  );

  return rows[0] || null;
}

export async function deleteCategory(id) {
  const { rowCount } = await query(`DELETE FROM categories WHERE id = $1`, [id]);
  return rowCount > 0;
}