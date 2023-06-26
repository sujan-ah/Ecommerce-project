import express from "express";
import Stripe from "stripe";
import Order from "../model/orderModel.js";
import { isAuth } from "../utils.js";
import dotenv from "dotenv";

dotenv.config();

const orderRouter = express.Router();

const strip = new Stripe(process.env.STRIP_CLIENT || "", null);

orderRouter.post("/", isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((p) => ({ ...p, product: p._id })),
    shippingaddress: req.body.shippingaddress,
    paymentMethod: req.body.paymentMethod,
    productPrice: req.body.productPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.body.userId,
  });
  const order = await newOrder.save();
  res.status(201).send({ msg: "New Order Created", order });
});

orderRouter.get("/mine/:id", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.params.id });

  if (orders) {
    res.send(orders);
  } else {
    res.status(404).send({ msg: "Order Not Found" });
  }
});

orderRouter.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ msg: "Order Not Found" });
  }
});

orderRouter.put("/:id/pay", isAuth, async (req, res) => {
  Paypal;
  console.log(req.params.id);
  const order = await Order.findById(req.params.id);
  console.log(order);
  if (order) {
    (order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        id: req.body.id,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      });
    const updateOrder = await order.save();
    res.send({ msg: "Order Paid", updateOrder });
  } else {
    res.status(404).send({ msg: "Order Not Found" });
  }
});

orderRouter.post("/:id/payment", isAuth, async function (req, res) {
  const { token = {}, amount = 0 } = req.body;

  if (!Object.keys(token).length || !amount) {
    res.status(404).send({ msg: "Order Not Found" });
  }

  const { id: customerId } = await strip.customer
    .create({
      email: token.email,
      source: token.id,
    })
    .catch((e) => {
      return null;
    });

  const invoiceId = `${
    token.email
  }-${Math.random().toString()}-${Date.now().toString()}`;

  const charge = await strip.ChargesResource.create(
    {
      amount: amount,
      currency: "USD",
      customerId: customerId,
      receipt_email: token.email,
      description: "Dvaly Payment",
    },
    {
      idempotencyKey: invoiceId,
    }
  ).catch((e) => {
    return null;
  });

  if (!charge) {
    res.status(500).send({ msg: "Order Not Found" });
  }
});

export default orderRouter;
