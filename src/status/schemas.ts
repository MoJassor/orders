export default {
  addStatusSchema: {
    summary: "add new status to the system",
    tags: ["Status"],
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string", example: "Created" },
        },
      },
      400: { message: { type: "string", example: "Bad request" } },
      405: { message: { type: "string", example: "Method not allowed" } },
      401: { message: { type: "string", example: "unauthorized" } },
      403: { message: { type: "string", example: "forbidden" } },
      500: {
        message: { type: "string", example: "internal server error" },
      },
    },
  },

  getAllStatusesSchema: {
    summary: "see all statuses",
    tags: ["Status"],
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            title: { type: "string" },
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
