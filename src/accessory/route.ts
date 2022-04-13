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

  app.delete(
    "/accessory/:accessoryId",
    { schema: accessoryRoutesSchema.deleteAccessorySchema },

    async (
      req:
        | FastifyRequest<{
            Params: { accessoryId: number };
          }>
        | any,
      reply: FastifyReply
    ) => {
      if (!req.user.isManager)
        return reply
          .code(405)
          .send({ message: "delete is allowed for admins just" });

      const accessory = await accessoryService.findAccessoryById(
        req.params.accessoryId
      );
      if (!accessory)
        return reply.code(404).send({ message: "accessory not found" });
      await accessory.destroy({});
      reply.code(200).send({ message: "accessory deleted" });
    }
  );

  app.put(
    "/accessory/:accessoryId",
    { schema: accessoryRoutesSchema.updateAccessorySchema },

    async (
      req:
        | FastifyRequest<{
            Params: { accessoryId: number };
            Body: {
              name?: string;
              description?: string;
              price?: number;
              image_url?: string;
            };
          }>
        | any,
      reply: FastifyReply
    ) => {
      if (!req.user.isManager)
        return reply
          .code(405)
          .send({ message: "update is allowed for admins just" });

      const accessory = await accessoryService.findAccessoryById(
        req.params.accessoryId
      );
      if (!accessory)
        return reply.code(404).send({ message: "accessory not found" });
      await accessory.update(req.body);
      reply.code(200).send({ message: "accessory updated" });
    }
  );
}
export default router;
