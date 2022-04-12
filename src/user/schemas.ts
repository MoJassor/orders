export default {
  registerUserSchema: {
    summary: "register new user's account in our system",
    description:
      "you can create new account by your phone number which should be a uniq value and a strong password",
    tags: ["User"],
    body: {
      type: "object",
      required: ["name", "phone", "password"],
      properties: {
        name: {
          type: "string",
        },
        phone: {
          type: "string",
        },
        password: {
          type: "string",
        },
        is_manager: {
          type: "number",
        },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          newUser: {
            type: "object",
            properties: {
              is_manager: { type: "boolean" },
              id: { type: "number" },
              name: { type: "string" },
              phone: { type: "string" },
            },
          },
          token: {
            type: "string",
          },
        },
      },
      400: { message: { type: "string", example: "Bad request" } },
      500: {
        message: { type: "string", example: "internal server error" },
      },
    },
  },

  updateUserSchema: {
    tags: ["User"],
    params: {
      type: "object",
      required: ["employeeId"],
      properties: {
        employeeId: { type: "string", example: "612cf43bf433f84ea435d59e" },
      },
    },
    body: {
      type: "object",
      properties: {
        fullName: {
          type: "string",
        },
        password: {
          type: "string",
        },
        phone: {
          type: "string",
        },
        email: {
          type: "string",
        },
        permissions: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
    response: {
      200: { message: { type: "string", example: "Updated" } },
      400: { message: { type: "string", example: "Bad request" } },
      401: { message: { type: "string", example: "unauthorized" } },
      403: { message: { type: "string", example: "Forbidden" } },
      500: {
        message: { type: "string", example: "internal server error" },
      },
    },
  },

  loginUserSchema: {
    tags: ["User"],
    body: {
      type: "object",
      required: ["phone", "password"],
      properties: {
        phone: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          token: {
            type: "string",
          },
        },
      },
      400: { message: { type: "string", example: "Bad request" } },
      500: {
        message: { type: "string", example: "internal server error" },
      },
    },
  },

  getAllUsersSchema: {
    tags: ["User"],
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            phone: { type: "string" },
            id: { type: "number" },
            is_manager: { type: "boolean" },
          },
        },
      },
      400: { message: { type: "string", example: "Bad request" } },
      401: { message: { type: "string", example: "unauthorized" } },
      403: { message: { type: "string", example: "Forbidden" } },
      500: {
        message: { type: "string", example: "internal server error" },
      },
    },
  },
};
