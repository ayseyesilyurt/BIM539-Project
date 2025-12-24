import { query } from "../config/db.js";

export async function findAllProducts() {
  const { rows } = await query(
    `SELECT 
        p.id,
        p.name,
        p.price,
        p.category_id AS "categoryId",
        c.name AS "categoryName",
        p.created_at AS "createdAt"
     FROM products p
     JOIN categories c ON c.id = p.category_id
     ORDER BY p.id ASC`
  );
  return rows;
}

export async function findProductById(id) {
  const { rows } = await query(
    `SELECT 
        p.id,
        p.name,
        p.price,
        p.category_id AS "categoryId",
        c.name AS "categoryName",
        p.created_at AS "createdAt"
     FROM products p
     JOIN categories c ON c.id = p.category_id
     WHERE p.id = $1`,
    [id]
  );
  return rows[0] || null;
}

export async function createProduct({ name, price, categoryId }) {
  const { rows } = await query(
    `INSERT INTO products (name, price, category_id)
     VALUES ($1, $2, $3)
     RETURNING id, name, price, category_id AS "categoryId", created_at AS "createdAt"`,
    [name, price, categoryId]
  );
  return rows[0];
}

export async function updateProduct(id, data) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(data.name);
  }
  if (data.price !== undefined) {
    fields.push(`price = $${idx++}`);
    values.push(data.price);
  }
  if (data.categoryId !== undefined) {
    fields.push(`category_id = $${idx++}`);
    values.push(data.categoryId);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const { rows } = await query(
    `UPDATE products
     SET ${fields.join(", ")}
     WHERE id = $${idx}
     RETURNING id, name, price, category_id AS "categoryId", created_at AS "createdAt"`,
    values
  );

  return rows[0] || null;
}

export async function deleteProduct(id) {
  const { rowCount } = await query(`DELETE FROM products WHERE id = $1`, [id]);
  return rowCount > 0;
}

// FK doğrulama için: category var mı?
export async function categoryExists(categoryId) {
  const { rows } = await query(`SELECT 1 FROM categories WHERE id = $1`, [categoryId]);
  return rows.length > 0;
}