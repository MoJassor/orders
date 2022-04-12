import { FastifyInstance } from "fastify";
import CartService from "./service";
import CartItemService from "../cartItem/service";
import ProductService from "../product/service";
import { FastifyReply, FastifyRequest } from "fastify";
import cartRouteSchema from "./schemas";
import { verify } from "../utilize/token.service";
import CartItemAccessoryService from "../cartItemAccessory/service";
import AccessoryService from "../accessory/service";

const cartService = new CartService();
const cartItemService = new CartItemService();
const accessoryService = new AccessoryService();
const productService = new ProductService();
const cartItemAccessoryService = new CartItemAccessoryService();

async function router(app: FastifyInstance) {
  app.addHook("preValidation", verify);

  app.post(
    "/addToCart",
    { schema: cartRouteSchema.addProductToCartSchema },
    async (
      req:
        | FastifyRequest<{
            Body: {
              products: Array<{
                productId: number;
                quantity: number;
                accessories: Array<{
                  accessoryId: number;
                  quantity: number;
                }>;
              }>;
            };
          }>
        | any,
      reply: FastifyReply
    ) => {
      const products = req.body.products;
      const newCart = await cartService.addCart({
        userId: req.user.id,
      });
      for (const product of products) {
        const existProduct = await productService.findProductById(
          product.productId
        );
        if (!existProduct) continue;
        const newCartItem = await cartItemService.addCartItem({
          cartId: newCart.id,
          productId: existProduct.id,
          quantity: product.quantity,
          price: existProduct.price,
        });
        for (const accessory of product.accessories) {
          const existAccessory = await accessoryService.findAccessoryById(
            accessory.accessoryId
          );
          await cartItemAccessoryService.addCartItemAccessory({
            accessoryId: accessory.accessoryId,
            quantity: accessory.quantity,
            price: existAccessory.price,
            cartItemId: newCartItem.id,
          });
        }
      }

      reply.code(201).send({ message: "Created" });
    }
  );

  app.get(
    "/cart/:cartId",
    { schema: cartRouteSchema.getOneCartSchema },

    async (
      req:
        | FastifyRequest<{
            Params: { cartId: number };
          }>
        | any,
      reply: FastifyReply
    ) => {
      const cart = await cartService.findCartById(req.params.cartId, {
        userId: req.user.id,
      });

      if (!cart) return reply.code(404).send({ message: "Cart not found" });
      reply.send({ cart });
    }
  );

  app.get(
    "/myCart",
    { schema: cartRouteSchema.getMyCartSchema },
    async (
      req:
        | FastifyRequest<{
            Body: {
              password: string;
            };
          }>
        | any,

      reply: FastifyReply
    ) => {
      const carts = await cartService.findCartsByOptions({
        where: { userId: req.user.id },
      });
      console.log(carts);

      reply.send(carts);
    }
  );
}
export default router;
