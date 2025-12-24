import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export function setupSwagger(app) {
  const options = {
    definition: {
      openapi: "3.0.3",
      info: { title: "Kalite API", version: "1.0.0" },
      servers: [{ url: "http://localhost:3000" }]
    },
    apis: ["./src/routes/*.js"]
  };

  const spec = swaggerJSDoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
  app.get("/api-docs.json", (req, res) => res.json(spec));
}