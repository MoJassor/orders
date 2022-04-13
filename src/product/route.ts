import { FastifyInstance } from "fastify";
import ProductService from "./service";
import { FastifyReply, FastifyRequest } from "fastify";
import { Op } from "sequelize";
import productRoutesSchema from "./schemas";
import { verify } from "../utilize/token.service";
const productService = new ProductService();

async function router(app: FastifyInstance) {
  app.addHook("preValidation", verify);

  app.get(
    "/product",
    { schema: productRoutesSchema.getAllProductsSchema },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const products = await productService.findProductsByOptions({
        where: { is_visible: true, quantity: { [Op.gt]: 0 } },
        attributes: [
          "id",
          "quantity",
          "price",
          "name",
          "image_url",
          "description",
        ],
      });
      reply.send(products);
    }
  );

  app.get(
    "/products/:categoryId",
    { schema: productRoutesSchema.getCategoryProductsSchema },
    async (
      req: FastifyRequest<{
        Params: { categoryId: number };
      }>,
      reply: FastifyReply
    ) => {
      const products = await productService.findProductsByOptions({
        where: {
          categoryId: req.params.categoryId,
          is_visible: true,
          quantity: { [Op.gt]: 0 },
        },
      });
      reply.send(products);
    }
  );

  app.get(
    "/product/:productId",
    { schema: productRoutesSchema.getOneProductSchema },
    async (
      req: FastifyRequest<{
        Params: { productId: number };
      }>,
      reply: FastifyReply
    ) => {
      const product = await productService.findProductById(
        req.params.productId
      );
      if (!product)
        return reply.code(404).send({ message: "product not found " });
      reply.code(200).send(product);
    }
  );

  app.delete(
    "/product/:productId",
    { schema: productRoutesSchema.deleteProductSchema },

    async (
      req:
        | FastifyRequest<{
            Params: { productId: number };
          }>
        | any,
      reply: FastifyReply
    ) => {
      if (!req.user.isManager)
        return reply
          .code(405)
          .send({ message: "delete is allowed for admins just" });

      const product = await productService.findProductById(
        req.params.productId
      );
      if (!product)
        return reply.code(404).send({ message: "product not found" });
      await product.destroy({});
      reply.code(200).send({ message: "product deleted" });
    }
  );

  app.put(
    "/product/:productId",
    { schema: productRoutesSchema.updateProductSchema },

    async (
      req:
        | FastifyRequest<{
            Params: { productId: number };
            Body: {
              name?: string;
              description?: string;
              price?: number;
              quantity?: number;
              image_url?: string;
              is_visible?: boolean;
            };
          }>
        | any,
      reply: FastifyReply
    ) => {
      if (!req.user.isManager)
        return reply
          .code(405)
          .send({ message: "update is allowed for admins just" });

      const product = await productService.findProductById(
        req.params.productId
      );
      if (!product)
        return reply.code(404).send({ message: "product not found" });
      await product.update(req.body);
      reply.code(200).send({ message: "product updated" });
    }
  );

  app.post(
    "/product",
    { schema: productRoutesSchema.addProductSchema },
    async (req: FastifyRequest | any, reply: FastifyReply) => {
      if (!req.user.isManager)
        return reply.code(405).send({ message: "sorry! you're not an admin" });

      await productService.addProduct(req.body);
      reply.code(201).send({ message: "created" });
    }
  );
}
export default router;
