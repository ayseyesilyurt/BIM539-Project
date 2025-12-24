import * as service from "../services/categories.service.js";

export async function list(req, res, next) {
  try {
    const categories = await service.listCategories();
    res.status(200).json(categories);
  } catch (e) {
    next(e);
  }
}

export async function getById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const category = await service.getCategory(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const result = await service.addCategory(req.body);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(201).json(result.data);
  } catch (e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await service.editCategory(id, req.body);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(200).json(result.data);
  } catch (e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await service.removeCategory(id);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(200).json(result.data);
  } catch (e) {
    next(e);
  }
}