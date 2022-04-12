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
      const categories = await categoryService.findCategoriesByOptions();
      reply.send(categories);
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
