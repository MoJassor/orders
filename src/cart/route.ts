import { FastifyInstance } from "fastify";
import CartService from "./service";
import ProductService from "../product/service";
import { FastifyReply, FastifyRequest } from "fastify";
import cartRouteSchema from "./schemas";
import { verify } from "../utilize/token.service";
import CartItemAccessoryService from "../cartItemAccessory/service";
import AccessoryService from "../accessory/service";
import { Op, Sequelize } from "sequelize";
import Product from "../product/model";
import CartItemAccessory from "../cartItemAccessory/model";
import Accessory from "../accessory/model";
import CartItem from "../cartItem/model";
import Status from "../status/model";
import User from "../user/model";
import generateQR from "../utilize/qr.generator";

const cartService = new CartService();
const accessoryService = new AccessoryService();
const productService = new ProductService();
const cartItemAccessoryService = new CartItemAccessoryService();

async function router(app: FastifyInstance) {
  app.addHook("preValidation", verify);

  // add new cart session route
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
      let totalPrice = 0;
      const products = req.body.products;
      const newCart = await cartService.addCart({
        userId: req.user.id,
        statuesId: 1,
      });
      for (const product of products) {
        const existProduct = await productService.findProductById(
          product.productId
        );
        if (!existProduct) continue;
        const newCartItem = await (newCart as any).createCartItem({
          productId: existProduct.id,
          productQuantity: product.quantity,
          productPrice: existProduct.price,
        });
        totalPrice += existProduct.price * product.quantity;
        for (const accessory of product.accessories) {
          const existAccessory = await accessoryService.findAccessoryById(
            accessory.accessoryId
          );
          if (!existAccessory) continue;
          await cartItemAccessoryService.addCartItemAccessory({
            accessoryId: accessory.accessoryId,
            partQuantity: accessory.quantity,
            partPrice: existAccessory.price,
            cartItemId: newCartItem.id,
          });
          totalPrice += existAccessory.price * accessory.quantity;
        }
      }
      newCart.update({ totalPrice });
      reply.code(201).send({ message: "Created" });
    }
  );

  // make order route
  app.post(
    "/makeOrder/:cartId",
    { schema: cartRouteSchema.makeOrderSchema },
    async (
      req:
        | FastifyRequest<{
            Params: { cartId: number };
          }>
        | any,
      reply: FastifyReply
    ) => {
      const cart = await cartService.findCartByOptions({
        where: { id: req.params.cartId, userId: req.user.id },

        include: [
          {
            model: CartItem,
            as: "cartItem",
          },
        ],
      });
      if (!cart) return reply.code(404).send({ message: "not found" });
      if (req.body.amount < cart.totalPrice)
        return reply
          .code(405)
          .send({ message: "you should to pay the total price" });

      for (const cartItem of (cart as any).cartItem) {
        await Product.update(
          {
            quantity: Sequelize.literal(
              `quantity - ${cartItem.productQuantity}`
            ),
          },
          { where: { id: cartItem.productId } }
        );
      }
      await cart.update({
        address: req.body.address,
        statuesId: 2,
      });

      reply.code(200).send({ message: "added to your orders" });
    }
  );

  // get one order route
  app.get(
    "/order/:orderId",
    { schema: cartRouteSchema.getOneOrderSchema },
    async (
      req:
        | FastifyRequest<{
            Params: { orderId: number };
          }>
        | any,
      reply: FastifyReply
    ) => {
      const cart = await cartService.findCartByOptions({
        where: { id: req.params.orderId, userId: req.user.id },
        attributes: {
          exclude: ["updatedAt", "deletedAt", "userId", "statuesId", "address"],
        },
        include: [
          {
            model: Status,
            as: "statues",
            paranoid: false,
            attributes: ["title"],
          },
          {
            model: CartItem,
            as: "cartItem",
            attributes: ["id", "productPrice", "productQuantity"],
            paranoid: false,
            include: [
              {
                model: CartItemAccessory,
                as: "productParts",
                attributes: ["id", "partPrice", "partQuantity"],
                paranoid: false,
                include: {
                  model: Accessory,
                  as: "accessory",
                  paranoid: false,
                  attributes: ["id", "name", "image_url"],
                },
              },
              {
                model: Product,
                as: "product",
                paranoid: false,
                attributes: ["id", "name", "image_url"],
              },
            ],
          },
        ],
      });

      if (!cart) return reply.code(404).send({ message: "Cart not found" });
      reply.code(200).send(cart);
    }
  );

  // get cart details route
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
      const cart = await cartService.findCartByOptions({
        where: { id: req.params.cartId, userId: req.user.id },
        attributes: {
          exclude: ["updatedAt", "deletedAt", "userId", "statuesId", "address"],
        },
        include: [
          {
            model: Status,
            as: "statues",
            paranoid: false,
            attributes: ["title"],
          },
          {
            model: CartItem,
            as: "cartItem",
            attributes: ["id", "productPrice", "productQuantity"],
            paranoid: false,
            include: [
              {
                model: CartItemAccessory,
                as: "productParts",
                attributes: ["id", "partPrice", "partQuantity"],
                paranoid: false,
                include: {
                  model: Accessory,
                  as: "accessory",
                  paranoid: false,
                  attributes: ["id", "name", "image_url"],
                },
              },
              {
                model: Product,
                as: "product",
                paranoid: false,
                attributes: ["id", "name", "image_url"],
              },
            ],
          },
        ],
      });
      if (!cart) return reply.code(404).send({ message: "Cart not found" });
      console.log(cart);

      reply.code(200).send(cart);
    }
  );

  // get my orders route
  app.get(
    "/myOrders",
    { schema: cartRouteSchema.getMyOrdersSchema },
    async (
      req: FastifyRequest | any,

      reply: FastifyReply
    ) => {
      const orders = await cartService.findCartsByOptions({
        where: { userId: req.user.id, statuesId: { [Op.ne]: 1 } },

        include: {
          model: CartItem,
          as: "cartItem",
          attributes: ["id", "productPrice", "productQuantity"],
          paranoid: false,
          include: [
            {
              model: Product,
              as: "product",
              paranoid: false,
              attributes: ["id", "name", "image_url"],
            },
          ],
        },
      });

      for (const order of orders) {
        (order as any).dataValues.QRCode = await generateQR(
          `${process.env.serverUrl}/api/order/${order.id}`
        );
      }
      reply.code(200).send(orders);
    }
  );

  // get my cart items route
  app.get(
    "/myCart",
    { schema: cartRouteSchema.getMyCartSchema },
    async (
      req: FastifyRequest | any,

      reply: FastifyReply
    ) => {
      const carts = await cartService.findCartsByOptions({
        where: { userId: req.user.id, statuesId: 1 },
        attributes: {
          exclude: ["updatedAt", "deletedAt", "userId", "statuesId", "address"],
        },
        include: [
          {
            model: CartItem,
            as: "cartItem",
            attributes: ["id", "productPrice", "productQuantity"],
            paranoid: false,
            include: [
              {
                model: CartItemAccessory,
                as: "productParts",
                attributes: ["id", "partPrice", "partQuantity"],
                paranoid: false,
                include: {
                  model: Accessory,
                  as: "accessory",
                  paranoid: false,
                  attributes: ["id", "name", "image_url"],
                },
              },
              {
                model: Product,
                as: "product",
                paranoid: false,
                attributes: ["id", "name", "image_url"],
              },
            ],
          },
          {
            model: Status,
            as: "statues",
            paranoid: false,
            attributes: ["title"],
          },
          {
            model: User,
            as: "user",
            paranoid: false,
            attributes: ["name", "phone"],
          },
        ],
      });
      reply.code(200).send(carts);
    }
  );
}
export default router;
