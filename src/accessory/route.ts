import { FastifyInstance } from "fastify";
import AccessoryService from "./service";
const accessoryService = new AccessoryService();
import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "../utilize/token.service";
import accessoryRoutesSchema from "./schemas";

async function router(app: FastifyInstance) {
  app.addHook("preValidation", verify);

  app.get(
    "/accessory/:productId",
    { schema: accessoryRoutesSchema.getProductAccessoriesSchema },
    async (
      req: FastifyRequest<{
        Params: { productId: number };
      }>,
      reply: FastifyReply
    ) => {
      const accessories = await accessoryService.findAccessoriesByOptions({
        where: {
          productId: req.params.productId,
        },
      });
      reply.send(accessories);
    }
  );

  app.post(
    "/accessory",
    { schema: accessoryRoutesSchema.addAccessorySchema },
    async (
      req: FastifyRequest<{
        Body: {};
      }>,
      reply: FastifyReply
    ) => {
      await accessoryService.addAccessory(req.body);
      reply
        .code(201)
        .send({ message: "accessory has been add to the product" });
    }
  );
}
export default router;
