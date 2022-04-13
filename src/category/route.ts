import { FastifyInstance } from "fastify";
import CategoryService from "./service";
import { FastifyReply, FastifyRequest } from "fastify";
import categoryRouteSchema from "./schemas";
import { verify } from "../utilize/token.service";
const categoryService = new CategoryService();
async function router(app: FastifyInstance) {
  app.addHook("preValidation", verify);
  app.get(
    "/category",
    { schema: categoryRouteSchema.getAllCategoriesSchema },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const categories = await categoryService.findCategoriesByOptions({
        where: { is_visible: true },
      });
      reply.send(categories);
    }
  );

  app.delete(
    "/category/:categoryId",
    { schema: categoryRouteSchema.deleteCategorySchema },

    async (
      req:
        | FastifyRequest<{
            Params: { categoryId: number };
          }>
        | any,
      reply: FastifyReply
    ) => {
      if (!req.user.isManager)
        return reply
          .code(405)
          .send({ message: "delete is allowed for admins just" });

      const category = await categoryService.findCategoryById(
        req.params.categoryId
      );
      if (!category)
        return reply.code(404).send({ message: "category not found" });
      await category.destroy({});
      reply.code(200).send({ message: "category deleted" });
    }
  );

  app.put(
    "/category/:categoryId",
    { schema: categoryRouteSchema.updateCategorySchema },

    async (
      req:
        | FastifyRequest<{
            Params: { categoryId: number };
            Body: {
              title?: string;
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

      const category = await categoryService.findCategoryById(
        req.params.categoryId
      );
      if (!category)
        return reply.code(404).send({ message: "category not found" });
      await category.update(req.body);
      reply.code(200).send({ message: "category updated" });
    }
  );

  app.get(
    "/category/:categoryId",
    { schema: categoryRouteSchema.getOneCategorySchema },

    async (
      req: FastifyRequest<{
        Params: { categoryId: number };
      }>,
      reply: FastifyReply
    ) => {
      const category = await categoryService.findCategoryById(
        req.params.categoryId
      );
      reply.code(200).send(category);
    }
  );

  app.post(
    "/category",
    { schema: categoryRouteSchema.addCategorySchema },
    async (
      req:
        | FastifyRequest<{
            Body: {};
          }>
        | any,
      reply: FastifyReply
    ) => {
      if (!req.user.isManager)
        return reply.code(405).send({
          message: "this action is not allowed if you are not a manager",
        });
      const newCategory = await categoryService.addCategory(req.body);
      reply.send({ newCategory });
    }
  );
}
export default router;
