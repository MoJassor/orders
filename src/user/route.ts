import { FastifyInstance } from "fastify";
import UserService from "./service";
import userRoutesSchema from "./schemas";
import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import { createToken, verify } from "../utilize/token.service";

const userService = new UserService();

async function router(app: FastifyInstance) {
  app.get(
    "/user",
    { schema: userRoutesSchema.getAllUsersSchema, preValidation: verify },
    async (req: FastifyRequest | any, reply: FastifyReply) => {
      if (!req.user.isManager)
        return reply.code(405).send({ message: "method not allowed" });
      const users = await userService.findUsersByOptions();
      reply.send(users);
    }
  );
  app.get(
    "/user/:userId",
    { schema: userRoutesSchema.getOneUserSchema, preValidation: verify },
    async (req: FastifyRequest | any, reply: FastifyReply) => {
      if (!req.user.isManager)
        return reply.code(405).send({ message: "method not allowed" });
      const user = await userService.findUserById(req.params.userId);
      reply.send({ user });
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
        phone: req.body.phone,
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
}
export default router;
