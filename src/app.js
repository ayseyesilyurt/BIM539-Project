import express from "express";
import morgan from "morgan";
import cors from "cors";

import routes from "./routes/index.js";

// ✅ Swagger
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ✅ Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;