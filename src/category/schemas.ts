export default {
  addCategorySchema: {
    summary: "add new category to our system",
    description: "you can add new Categories by it's title,image_url",
    tags: ["Category"],
    body: {
      type: "object",
      required: ["title", "image_url"],
      properties: {
        title: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        is_visible: {
          type: "boolean",
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

  updateCategorySchema: {
    summary: "Update Category info",
    description:
      "you can update category title, image_url and is_visible attributes",
    tags: ["Category"],
    params: {
      type: "object",
      required: ["categoryId"],
      properties: {
        categoryId: { type: "number" },
      },
    },
    body: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        is_visible: {
          type: "boolean",
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
  deleteCategorySchema: {
    summary: "Delete Category info",
    description: "you can delete category if you are an administrator",
    tags: ["Category"],
    params: {
      type: "object",
      required: ["categoryId"],
      properties: {
        categoryId: { type: "number" },
      },
    },

    response: {
      200: { message: { type: "string", example: "De" } },
      400: { message: { type: "string", example: "Bad request" } },
      401: { message: { type: "string", example: "unauthorized" } },
      404: { message: { type: "string", example: "not found" } },
      403: { message: { type: "string", example: "Forbidden" } },
      500: {
        message: { type: "string", example: "internal server error" },
      },
    },
  },

  getOneCategorySchema: {
    summary: "see Category info",
    description: "you can see category to delete or update it",
    tags: ["Category"],
    params: {
      type: "object",
      required: ["categoryId"],
      properties: { categoryId: { type: "number" } },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          id: { type: "number" },
          title: { type: "string" },
          image_url: { type: "string" },
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
  getAllCategoriesSchema: {
    summary: "fetch all Categories",
    description: "you can see our visible Categories",
    tags: ["Category"],
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            title: { type: "string" },
            image_url: { type: "string" },
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
