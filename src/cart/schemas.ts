export default {
  addProductToCartSchema: {
    summary: "add product to our your cart",
    tags: ["Cart"],
    body: {
      type: "object",
      required: ["products"],
      properties: {
        products: {
          type: "array",
          required: ["quantity", "productId"],
          items: {
            type: "object",
            properties: {
              productId: {
                type: "number",
              },
              quantity: {
                type: "number",
              },
              accessories: {
                required: ["accessoryId", "quantity"],
                type: "array",
                items: {
                  properties: {
                    accessoryId: {
                      type: "number",
                    },
                    quantity: {
                      type: "number",
                    },
                  },
                },
              },
            },
          },
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

  updateCartSchema: {
    tags: ["Cart"],
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

  getOneCartSchema: {
    summary: "see one cart item ",
    description:
      "You can view all products in your one cart session and you can delete or update it",
    tags: ["Cart"],
    required: ["cartId"],
    params: { type: "object", properties: { cartId: { type: "number" } } },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          cart: {
            type: "object",
            properties: {
              id: { type: "number" },
              cartItem: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    price: { type: "number" },
                    quantity: { type: "number" },
                    product: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        name: { type: "string" },
                        image_url: { type: "string" },
                      },
                    },
                    productParts: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          accessory: {
                            type: "object",
                            properties: {
                              id: { type: "number" },
                              name: { type: "string" },
                              image_url: { type: "string" },
                            },
                          },
                          quantity: { type: "string" },
                          price: { type: "number" },
                        },
                      },
                    },
                  },
                },
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
  getMyCartSchema: {
    summary: "see your cart's product ",
    description: "You can view all products in your cart and it's accessories",
    tags: ["Cart"],
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            cartItem: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  price: { type: "number" },
                  quantity: { type: "number" },
                  product: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      name: { type: "string" },
                      image_url: { type: "string" },
                    },
                  },
                  productParts: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        accessory: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            image_url: { type: "string" },
                          },
                        },
                        quantity: { type: "string" },
                        price: { type: "number" },
                      },
                    },
                  },
                },
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
