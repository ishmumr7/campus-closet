const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const User = require("../model/user");
const Product = require("../model/product");

// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      //   group cart items by sellerId
      const sellerItemsMap = new Map();

      for (const item of cart) {
        const sellerId = item.sellerId;
        if (!sellerItemsMap.has(sellerId)) {
          sellerItemsMap.set(sellerId, []);
        }
        sellerItemsMap.get(sellerId).push(item);
      }

      // create an order for each seller
      const orders = [];

      for (const [sellerId, items] of sellerItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;