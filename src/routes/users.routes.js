import { Router } from "express";
import * as c from "../controllers/users.controller.js";

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List users
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", c.list);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not Found }
 */
router.get("/:id", c.getById);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, fullName]
 *             properties:
 *               email: { type: string, example: "a@b.com" }
 *               fullName: { type: string, example: "Ada Lovelace" }
 *     responses:
 *       201: { description: Created }
 *       400: { description: Bad Request }
 */
router.post("/", c.create);

/**
 * @openapi
 * /api/users/{id}:
 *   patch:
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               fullName: { type: string }
 *     responses:
 *       200: { description: OK }
 *       400: { description: Bad Request }
 *       404: { description: Not Found }
 */
router.patch("/:id", c.update);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not Found }
 */
router.delete("/:id", c.remove);

export default router;