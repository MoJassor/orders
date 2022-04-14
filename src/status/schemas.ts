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
  updateStatusSchema: {
    summary: "Update Status info",
    description: "you can update status title attribute",
    tags: ["Status"],
    params: {
      type: "object",
      required: ["statusId"],
      properties: {
        statusId: { type: "number" },
      },
    },
    body: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
      },
    },
    response: {
      200: { message: { type: "string", example: "Updated" } },
      400: { message: { type: "string", example: "Bad request" } },
      401: { message: { type: "string", example: "unauthorized" } },
      404: { message: { type: "string", example: "not found" } },
      403: { message: { type: "string", example: "Forbidden" } },
      500: {
        message: { type: "string", example: "internal server error" },
      },
    },
  },
  deleteStatusSchema: {
    summary: "Delete Status",
    description: "you can delete status if you are an administrator",
    tags: ["Status"],
    params: {
      type: "object",
      required: ["statusId"],
      properties: {
        statusId: { type: "number" },
      },
    },

    response: {
      200: { message: { type: "string", example: "Delete" } },
      400: { message: { type: "string", example: "Bad request" } },
      401: { message: { type: "string", example: "unauthorized" } },
      404: { message: { type: "string", example: "not found" } },
      403: { message: { type: "string", example: "Forbidden" } },
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
