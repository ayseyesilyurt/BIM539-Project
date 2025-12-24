import * as repo from "../repositories/products.repo.js";
import { createProductSchema, updateProductSchema } from "../validators/products.schema.js";

export async function listProducts() {
  return repo.findAllProducts();
}

export async function getProduct(id) {
  return repo.findProductById(id);
}

export async function addProduct(payload) {
  const parsed = createProductSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: { status: 400, message: parsed.error.issues } };
  }

  // FK check: category var mı?
  const ok = await repo.categoryExists(parsed.data.categoryId);
  if (!ok) return { error: { status: 400, message: "Category does not exist" } };

  const product = await repo.createProduct(parsed.data);
  return { data: product };
}

export async function editProduct(id, payload) {
  const parsed = updateProductSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: { status: 400, message: parsed.error.issues } };
  }

  if (parsed.data.categoryId !== undefined) {
    const ok = await repo.categoryExists(parsed.data.categoryId);
    if (!ok) return { error: { status: 400, message: "Category does not exist" } };
  }

  const updated = await repo.updateProduct(id, parsed.data);
  if (!updated) return { error: { status: 404, message: "Product not found" } };

  return { data: updated };
}

export async function removeProduct(id) {
  const ok = await repo.deleteProduct(id);
  if (!ok) return { error: { status: 404, message: "Product not found" } };
  return { data: { deleted: true } };
}