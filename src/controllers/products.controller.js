import * as service from "../services/products.service.js";

export async function list(req, res, next) {
  try {
    const products = await service.listProducts();
    res.status(200).json(products);
  } catch (e) {
    next(e);
  }
}

export async function getById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const product = await service.getProduct(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const body = req.body ?? {};

    const payload = {
      name: body.name ?? body.product_name ?? body.productName,
      price: body.price,
      categoryId: body.categoryId ?? body.category_id,
    };

    const result = await service.addProduct(payload);

    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.status(201).json(result.data);
  } catch (e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await service.editProduct(id, req.body);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(200).json(result.data);
  } catch (e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await service.removeProduct(id);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(200).json(result.data);
  } catch (e) {
    next(e);
  }
}