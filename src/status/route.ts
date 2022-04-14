import { FastifyInstance } from "fastify";
import StatusService from "./service";
import { FastifyReply, FastifyRequest } from "fastify";
import StatuesRouteSchema from "./schemas";
import { verify } from "../utilize/token.service";
import statusRouteSchema from "./schemas";
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

  app.delete(
    "/status/:statusId",
    { schema: statusRouteSchema.deleteStatusSchema },

    async (
      req:
        | FastifyRequest<{
            Params: { statusId: number };
          }>
        | any,
      reply: FastifyReply
    ) => {
      if (!req.user.isManager)
        return reply
          .code(405)
          .send({ message: "delete is allowed for admins just" });

      const status = await statusService.findStatusById(req.params.statusId);
      if (!status) return reply.code(404).send({ message: "status not found" });
      await status.destroy({});
      reply.code(200).send({ message: "status deleted" });
    }
  );

  app.put(
    "/status/:statusId",
    { schema: statusRouteSchema.updateStatusSchema },

    async (
      req:
        | FastifyRequest<{
            Params: { statusId: number };
            Body: { title?: string };
          }>
        | any,
      reply: FastifyReply
    ) => {
      if (!req.user.isManager)
        return reply
          .code(405)
          .send({ message: "update is allowed for admins just" });

      const status = await statusService.findStatusById(req.params.statusId);
      if (!status) return reply.code(404).send({ message: "status not found" });
      await status.update(req.body);
      reply.code(200).send({ message: "status updated" });
    }
  );
}
export default router;
