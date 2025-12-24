import express from "express";
import morgan from "morgan";

import routes from "./routes/index.js";
import { setupSwagger } from "./docs/swagger.js";

export const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Swagger UI
setupSwagger(app);

// Routes
app.use("/api", routes);

// 404
app.use((req, res) => res.status(404).json({ message: "Not Found" }));