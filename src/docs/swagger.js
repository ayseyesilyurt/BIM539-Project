import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BIM539 Project API",
      version: "1.0.0",
      description: "REST API for categories, products, users, orders, reviews",
    },
    servers: [
      { url: "http://localhost:3000", description: "Local server" },
    ],
  },
  // Route dosyalarındaki JSDoc swagger comment'lerini okumak için:
  apis: ["./src/routes/*.js", "./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;