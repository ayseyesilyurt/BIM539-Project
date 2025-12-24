import * as repo from "../repositories/categories.repo.js";
import { createCategorySchema, updateCategorySchema } from "../validators/categories.schema.js";

export async function listCategories() {
  return repo.findAllCategories();
}

export async function getCategory(id) {
  return repo.findCategoryById(id);
}

export async function addCategory(payload) {
  const parsed = createCategorySchema.safeParse(payload);
  if (!parsed.success) {
    return { error: { status: 400, message: parsed.error.issues } };
  }

  try {
    const category = await repo.createCategory(parsed.data);
    return { data: category };
  } catch (e) {
    // unique name violation vs.
    return { error: { status: 400, message: "Category name already exists" } };
  }
}

export async function editCategory(id, payload) {
  const parsed = updateCategorySchema.safeParse(payload);
  if (!parsed.success) {
    return { error: { status: 400, message: parsed.error.issues } };
  }

  const updated = await repo.updateCategory(id, parsed.data);
  if (!updated) return { error: { status: 404, message: "Category not found" } };

  return { data: updated };
}

export async function removeCategory(id) {
  const ok = await repo.deleteCategory(id);
  if (!ok) return { error: { status: 404, message: "Category not found" } };
  return { data: { deleted: true } };
}