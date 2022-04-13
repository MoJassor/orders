import Fastify from "fastify";
import env from "dotenv";
env.config();
import * as fastifySwagger from "fastify-swagger";
import swaggerOptions from "./config/swagger.docs";
// import helmet from "fastify-helmet";
import rateLimit from "fastify-rate-limit";
const app = Fastify({
  logger: {
    level: "info",
  },
});
app.register(fastifySwagger as any, swaggerOptions);
import CORS from "fastify-cors";
app.register(CORS, {
  origin: true,
  methods: ["OPTIONS", "PUT", "GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute",
});

import connecter from "./database/database";
import categoryRoutes from "./category/route";
import productRoutes from "./product/route";
import userRoutes from "./user/route";
import accessoryRoutes from "./accessory/route";
import initRelations from "./database/relations";
import cartRoutes from "./cart/route";

app.register(userRoutes);
app.register(accessoryRoutes);
app.register(cartRoutes);
app.register(productRoutes);
app.register(categoryRoutes);
// app.register(helmet, { global: false });

app.setErrorHandler((error: any, request, reply) => {
  console.log(error);
  if (error.original && error.original.code === "23505")
    reply.status(409).send({ message: "duplicate key error" });
  else reply.status(500).send({ message: error.message });
});

app.listen(
  process.env.PORT || 3002,
  "0.0.0.0",
  async (error: any, address: string) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    initRelations();
    await connecter.sync({ force: false });
    (app as any).swagger();

    console.log(`Server listening at ${address}`);
  }
);
