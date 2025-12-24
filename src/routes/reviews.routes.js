import { Router } from "express";
import * as c from "../controllers/reviews.controller.js";

const router = Router();

/**
 * @openapi
 * /api/reviews:
 *   get:
 *     summary: List reviews
 *     responses:
 *       200: { description: OK }
 */
router.get("/", c.list);

/**
 * @openapi
 * /api/reviews/{id}:
 *   get:
 *     summary: Get review by id
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
 * /api/reviews:
 *   post:
 *     summary: Create review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, productId, rating]
 *             properties:
 *               userId: { type: integer, example: 1 }
 *               productId: { type: integer, example: 1 }
 *               rating: { type: integer, example: 5 }
 *               comment: { type: string, example: "Great product!" }
 *     responses:
 *       201: { description: Created }
 *       400: { description: Bad Request }
 */
router.post("/", c.create);

/**
 * @openapi
 * /api/reviews/{id}:
 *   patch:
 *     summary: Update review
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
 *               rating: { type: integer }
 *               comment: { type: string }
 *     responses:
 *       200: { description: OK }
 *       400: { description: Bad Request }
 *       404: { description: Not Found }
 */
router.patch("/:id", c.update);

/**
 * @openapi
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete review
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