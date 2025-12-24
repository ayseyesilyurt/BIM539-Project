import { Router } from "express";
import * as c from "../controllers/products.controller.js";

const router = Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: List products
 *     responses:
 *       200: { description: OK }
 */
router.get("/", c.list);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get product by id
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
 * /api/products:
 *   post:
 *     summary: Create product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, categoryId]
 *             properties:
 *               name: { type: string, example: "MacBook Air" }
 *               price: { type: number, example: 49999.90 }
 *               categoryId: { type: integer, example: 1 }
 *     responses:
 *       201: { description: Created }
 *       400: { description: Bad Request }
 */
router.post("/", c.create);

/**
 * @openapi
 * /api/products/{id}:
 *   patch:
 *     summary: Update product
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
 *               name: { type: string }
 *               price: { type: number }
 *               categoryId: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       400: { description: Bad Request }
 *       404: { description: Not Found }
 */
router.patch("/:id", c.update);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
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