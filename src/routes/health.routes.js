import { Router } from "express";
import { query } from "../config/db.js";

const router = Router();

/**
 * @openapi
 * /api/health/db:
 *   get:
 *     summary: Check database connection
 *     responses:
 *       200:
 *         description: DB OK
 *       500:
 *         description: DB error
 */
router.get("/db", async (req, res) => {
  try {
    await query("SELECT 1");
    res.status(200).json({ ok: true, db: "connected" });
  } catch (e) {
    res.status(500).json({ ok: false, db: "error", message: e.message });
  }
});

export default router;