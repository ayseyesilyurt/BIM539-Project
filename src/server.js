import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(`API running: http://localhost:${env.port}`);
  console.log(`Swagger: http://localhost:${env.port}/api-docs`);
});