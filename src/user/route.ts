import { FastifyInstance } from "fastify";
import UserService from "./service";
import userRoutesSchema from "./schemas";
import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import { createToken, verify } from "../utilize/token.service";

const userService = new UserService();

async function router(app: FastifyInstance) {
  app.get(
    "/users",
    { schema: userRoutesSchema.getAllUsersSchema, preValidation: verify },
    async (req: FastifyRequest | any, reply: FastifyReply) => {
      if (!req.user.isManager)
        return reply.code(405).send({ message: "method not allowed" });
      const users = await userService.findUsersByOptions();
      reply.send(users);
    }
  );
  app.get(
    "/user",
    { schema: userRoutesSchema.getMyProfileSchema, preValidation: verify },
    async (req: FastifyRequest | any, reply: FastifyReply) => {
      const user = await userService.findUserById(req.user.id);
      reply.send(user);
    }
  );

  app.get(
    "/user/:userId",
    { schema: userRoutesSchema.getOneUserSchema, preValidation: verify },
    async (req: FastifyRequest | any, reply: FastifyReply) => {
      if (!req.user.isManager)
        return reply.code(405).send({ message: "method not allowed" });
      const user = await userService.findUserById(req.params.userId);
      reply.send(user);
    }
  );

  app.post(
    "/userLogin",
    { schema: userRoutesSchema.loginUserSchema },
    async (
      req: FastifyRequest<{
        Body: {
          phone: string;
          password: string;
        };
      }>,
      reply: FastifyReply
    ) => {
      const existUser = await userService.findUserByOptions({
        where: { phone: req.body.phone },
      });
      if (!existUser)
        return reply.code(404).send({ message: "User not found" });
      const correctPassword = await bcrypt.compare(
        req.body.password,
        existUser.password
      );
      if (!correctPassword)
        return reply.code(405).send({ message: "password incorrect" });

      const token = createToken(
        { id: existUser.id, isManager: existUser.is_manager },
        `${process.env.securityKey}`,
        {
          expiresIn: "2d",
        }
      );
      reply.code(200).send({ token });
    }
  );
  app.post(
    "/userRegister",
    { schema: userRoutesSchema.registerUserSchema },
    async (
      req: FastifyRequest<{
        Body: {
          password: string;
        };
      }>,
      reply: FastifyReply
    ) => {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const newUser = await userService.addUser(req.body);
      const token = createToken(
        { id: newUser.id, isManager: newUser.is_manager },
        `${process.env.securityKey}`,
        {
          expiresIn: "2d",
        }
      );
      //@ts-ignore
      delete newUser.password;
      reply.send({ newUser, token });
    }
  );

  app.delete(
    "/user/:userId",
    { schema: userRoutesSchema.deleteUserSchema, preValidation: verify },

    async (
      req:
        | FastifyRequest<{
            Params: { userId: number };
          }>
        | any,
      reply: FastifyReply
    ) => {
      if (!req.user.isManager)
        return reply
          .code(405)
          .send({ message: "delete is allowed for admins just" });

      const user = await userService.findUserById(req.params.userId);
      if (!user) return reply.code(404).send({ message: "user not found" });
      await user.destroy({});
      reply.code(200).send({ message: "user deleted" });
    }
  );

  app.put(
    "/user",
    { schema: userRoutesSchema.updateUserProfileSchema, preValidation: verify },

    async (
      req:
        | FastifyRequest<{
            Body: { password?: string; name?: string };
          }>
        | any,
      reply: FastifyReply
    ) => {
      const { password = null } = req.body;
      const user = await userService.findUserById(req.user.id);
      if (!user) return reply.code(404).send({ message: "user not found" });
      if (password) req.body.password = await bcrypt.hash(password, 10);
      await user.update(req.body);
      reply.code(200).send({ message: "user updated" });
    }
  );

  app.put(
    "/user/:userId",
    { schema: userRoutesSchema.updateUserSchema, preValidation: verify },

    async (
      req:
        | FastifyRequest<{
            Params: { userId: number };
            Body: { is_manager?: boolean };
          }>
        | any,
      reply: FastifyReply
    ) => {
      if (!req.user.isManager)
        return reply
          .code(405)
          .send({ message: "update is allowed for admins just" });

      const user = await userService.findUserById(req.params.userId);
      if (!user) return reply.code(404).send({ message: "user not found" });
      await user.update(req.body);
      reply.code(200).send({ message: "user updated" });
    }
  );
}
export default router;
