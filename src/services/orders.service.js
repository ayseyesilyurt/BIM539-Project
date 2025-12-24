import * as repo from "../repositories/orders.repo.js";
import { createOrderSchema, updateOrderSchema } from "../validators/orders.schema.js";

export async function listOrders() {
  return repo.findAllOrders();
}

export async function getOrder(id) {
  return repo.findOrderById(id);
}

export async function addOrder(payload) {
  const parsed = createOrderSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: { status: 400, message: parsed.error.issues } };
  }

  const ok = await repo.userExists(parsed.data.userId);
  if (!ok) return { error: { status: 400, message: "User does not exist" } };

  const order = await repo.createOrder(parsed.data);
  return { data: order };
}

export async function editOrder(id, payload) {
  const parsed = updateOrderSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: { status: 400, message: parsed.error.issues } };
  }

  if (parsed.data.userId !== undefined) {
    const ok = await repo.userExists(parsed.data.userId);
    if (!ok) return { error: { status: 400, message: "User does not exist" } };
  }

  const updated = await repo.updateOrder(id, parsed.data);
  if (!updated) return { error: { status: 404, message: "Order not found" } };

  return { data: updated };
}

export async function removeOrder(id) {
  const ok = await repo.deleteOrder(id);
  if (!ok) return { error: { status: 404, message: "Order not found" } };
  return { data: { deleted: true } };
}