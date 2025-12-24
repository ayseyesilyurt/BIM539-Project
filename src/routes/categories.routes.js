import { Router } from "express";
import * as c from "../controllers/categories.controller.js";

const router = Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: List categories
 *     responses:
 *       200: { description: OK }
 */
router.get("/", c.list);

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by id
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
 * /api/categories:
 *   post:
 *     summary: Create category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "Laptops" }
 *     responses:
 *       201: { description: Created }
 *       400: { description: Bad Request }
 */
router.post("/", c.create);

/**
 * @openapi
 * /api/categories/{id}:
 *   patch:
 *     summary: Update category
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
 *     responses:
 *       200: { description: OK }
 *       400: { description: Bad Request }
 *       404: { description: Not Found }
 */
router.patch("/:id", c.update);

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete category
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