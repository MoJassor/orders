export default {
  addAccessorySchema: {
    summary: "Add an accessory to a specific product",
    description:
      "make sure that you are an admin and the product is already exist",
    tags: ["Accessory"],
    body: {
      type: "object",
      required: ["name", "price", "productId", "image_url"],
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        price: {
          type: "number",
        },
        image_url: {
          type: "string",
        },
        productId: {
          type: "number",
        },
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

  getProductAccessoriesSchema: {
    summary: "fetch all product's accessories",
    description: "you can see all product's accessories",
    tags: ["Accessory"],
    params: {
      type: "object",
      required: ["productId"],
      properties: {
        productId: { type: "number" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            image_url: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
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
  updateAccessorySchema: {
    summary: "Update accessory info",
    description:
      "you can update accessory name,description,price and image_url attributes",
    tags: ["Accessory"],
    params: {
      type: "object",
      required: ["accessoryId"],
      properties: {
        accessoryId: { type: "number" },
      },
    },
    body: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        description: {
          type: "string",
        },
        price: {
          type: "number",
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
  deleteAccessorySchema: {
    summary: "Delete accessory ",
    description: "you can delete accessory if you are an administrator",
    tags: ["Accessory"],
    params: {
      type: "object",
      required: ["accessoryId"],
      properties: {
        accessoryId: { type: "number" },
      },
    },

    response: {
      200: { message: { type: "string", example: "Deleted" } },
      400: { message: { type: "string", example: "Bad request" } },
      401: { message: { type: "string", example: "unauthorized" } },
      404: { message: { type: "string", example: "not found" } },
      403: { message: { type: "string", example: "Forbidden" } },
      500: {
        message: { type: "string", example: "internal server error" },
      },
    },
  },
};
