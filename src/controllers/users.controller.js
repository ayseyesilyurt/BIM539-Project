import * as service from "../services/users.service.js";

export async function list(req, res, next) {
  try {
    const users = await service.listUsers();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
}

export async function getById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const user = await service.getUser(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const result = await service.addUser(req.body);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(201).json(result.data);
  } catch (e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await service.editUser(id, req.body);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(200).json(result.data);
  } catch (e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await service.removeUser(id);
    if (result.error) return res.status(result.error.status).json({ message: result.error.message });
    res.status(200).json(result.data);
  } catch (e) {
    next(e);
  }
}