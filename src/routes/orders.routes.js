import { Router } from "express";
import * as c from "../controllers/orders.controller.js";

const router = Router();

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: List orders
 *     responses:
 *       200: { description: OK }
 */
router.get("/", c.list);

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by id
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
 * /api/orders:
 *   post:
 *     summary: Create order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, total]
 *             properties:
 *               userId: { type: integer, example: 1 }
 *               total: { type: number, example: 250.50 }
 *               status: { type: string, example: "pending" }
 *     responses:
 *       201: { description: Created }
 *       400: { description: Bad Request }
 */
router.post("/", c.create);

/**
 * @openapi
 * /api/orders/{id}:
 *   patch:
 *     summary: Update order
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
 *               userId: { type: integer }
 *               total: { type: number }
 *               status: { type: string, example: "paid" }
 *     responses:
 *       200: { description: OK }
 *       400: { description: Bad Request }
 *       404: { description: Not Found }
 */
router.patch("/:id", c.update);

/**
 * @openapi
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete order
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