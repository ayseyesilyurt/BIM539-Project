import * as repo from "../repositories/users.repo.js";
import { createUserSchema, updateUserSchema } from "../validators/users.schema.js";

export async function listUsers() {
  return repo.findAllUsers();
}

export async function getUser(id) {
  return repo.findUserById(id);
}

export async function addUser(payload) {
  const parsed = createUserSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: { status: 400, message: parsed.error.issues } };
  }

  try {
    const user = await repo.createUser(parsed.data);
    return { data: user };
  } catch (e) {
    // Unique email ihlali vs.
    return { error: { status: 400, message: "Email already exists" } };
  }
}

export async function editUser(id, payload) {
  const parsed = updateUserSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: { status: 400, message: parsed.error.issues } };
  }

  const updated = await repo.updateUser(id, parsed.data);
  if (!updated) return { error: { status: 404, message: "User not found" } };

  return { data: updated };
}

export async function removeUser(id) {
  const ok = await repo.deleteUser(id);
  if (!ok) return { error: { status: 404, message: "User not found" } };
  return { data: { deleted: true } };
}