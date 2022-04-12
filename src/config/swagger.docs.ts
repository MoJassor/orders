export default {
  routePrefix: "/documentation",
  exposeRoute: true,
  swagger: {
    openapi: "3.0.0",
    info: {
      title: "Order system task API",
      version: "0.0.1",
      contact: {
        name: "Mohammad Jassor Haj Radwan",
        email: "mohammadjassor@gmail.com",
      },
    },

    securityDefinitions: {
      jwtTokenBarer: {
        type: "apiKey",
        name: "authorization",
        in: "header",
      },
    },
    security: [
      {
        jwtTokenBarer: [],
      },
    ],
    hideUntagged: true,
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};
