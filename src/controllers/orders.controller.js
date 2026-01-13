import * as service from "../services/orders.service.js";

export async function list(req, res, next) {
  try {
    const orders = await service.listOrders();
    res.status(200).json(orders);
  } catch (e) {
    next(e);
  }
}

export async function getById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const order = await service.getOrder(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const body = req.body ?? {};

    const payload = {
      userId: body.userId ?? body.user_id,
      total: body.total,
      status: body.status,
    };

    const result = await service.addOrder(payload);

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
    const result = await service.editOrder(id, req.body);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(200).json(result.data);
  } catch (e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await service.removeOrder(id);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(200).json(result.data);
  } catch (e) {
    next(e);
  }
}