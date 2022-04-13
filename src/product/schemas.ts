export default {
  addProductSchema: {
    summary: "add new product to our system",
    description:
      "you can add new product by it's name,description,price,quantity and image_url which belong to one category",
    tags: ["Product"],
    body: {
      type: "object",
      required: ["name", "price", "quantity", "categoryId", "image_url"],
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
        quantity: {
          type: "number",
        },
        image_url: {
          type: "string",
        },
        categoryId: {
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

  getAllProductsSchema: {
    summary: "fetch all products",
    description: "you can see our visible and available products",
    tags: ["Product"],
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
            quantity: { type: "number" },
            price: { type: "number" },
            category: {
              type: "object",
              properties: {
                title: { type: "string" },
                image_url: { type: "string" },
              },
            },
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
  getCategoryProductsSchema: {
    summary: "fetch specific products",
    description: "You can view all products belonging to a specific category",
    tags: ["Product"],
    required: ["categoryId"],
    params: {
      type: "object",
      properties: { categoryId: { type: "number" } },
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
            quantity: { type: "number" },
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
  updateProductSchema: {
    summary: "Update Product info",
    description:
      "you can update product name, image_url,price.quantity,description and is_visible attributes",
    tags: ["Product"],
    params: {
      type: "object",
      required: ["productId"],
      properties: {
        productId: { type: "number" },
      },
    },
    body: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        quantity: {
          type: "number",
        },
        price: {
          type: "number",
        },
        is_visible: {
          type: "boolean",
        },
      },
      additionalProperties: false,
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
  deleteProductSchema: {
    summary: "Delete Product",
    description: "you can delete product if you are an administrator",
    tags: ["Product"],
    params: {
      type: "object",
      required: ["productId"],
      properties: {
        productId: { type: "number" },
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
  getOneProductSchema: {
    summary: "see product's details ",
    description: "You can view all products info and it's accessories",
    tags: ["Product"],
    params: {
      required: ["productId"],
      type: "object",
      properties: { productId: { type: "number" } },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          image_url: { type: "string" },
          description: { type: "string" },
          quantity: { type: "number" },
          price: { type: "number" },
          accessories: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                description: { type: "string" },
                image_url: { type: "string" },
                price: { type: "number" },
              },
            },
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
