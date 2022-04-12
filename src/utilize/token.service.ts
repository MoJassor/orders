import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify";
import jwt from "jsonwebtoken";
export const verify = (
  req: FastifyRequest | any,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, `${process.env.securityKey}`, (error: any, user: any) => {
      if (error) return reply.code(403).send("Forbidden");
      req.user = user;
      done();
    });
  } else return reply.code(401).send("unauthorized");
};
export const createToken = (payload: object, key: string, options: any) => {
  return jwt.sign(payload, key, options);
};
