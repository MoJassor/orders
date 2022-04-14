import { FastifyInstance } from "fastify";
import StatusService from "./service";
import { FastifyReply, FastifyRequest } from "fastify";
import StatuesRouteSchema from "./schemas";
import { verify } from "../utilize/token.service";

const statusService = new StatusService();

async function router(app: FastifyInstance) {
  app.addHook("preValidation", verify);

  app.post(
    "/status",
    { schema: StatuesRouteSchema.addStatusSchema },
    async (
      req:
        | FastifyRequest<{
            Body: {
              title: string;
            };
          }>
        | any,
      reply: FastifyReply
    ) => {
      await statusService.addStatus(req.body);
      reply.code(201).send({ message: "Created" });
    }
  );

  app.get(
    "/status",
    { schema: StatuesRouteSchema.getAllStatusesSchema },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const statuses = await statusService.findStatusesByOptions({});
      reply.code(200).send(statuses);
    }
  );
}
export default router;
