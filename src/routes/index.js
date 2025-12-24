import { Router } from "express";
import usersRoutes from "./users.routes.js";
import healthRoutes from "./health.routes.js";
import categoriesRoutes from "./categories.routes.js";
import productsRoutes from "./products.routes.js";
import ordersRoutes from "./orders.routes.js";
import reviewsRoutes from "./reviews.routes.js";    

const router = Router();

router.use("/users", usersRoutes);
router.use("/health", healthRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);
router.use("/reviews", reviewsRoutes);

export default router;