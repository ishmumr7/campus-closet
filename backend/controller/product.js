const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const Product = require("../model/product");
const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");

// Create Procuct
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellerId = req.body.sellerId;
      const seller = await User.findById(sellerId);

      if (!seller) {
        return next(new ErrorHandler("Invalid Seller Id!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const productData = req.body;
        productData.images = imageUrls;
        productData.seller = seller;

        const product = await Product.create(productData);

        res.status(200).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//Get seller products
router.get(
  "/get-all-products-seller/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ sellerId: req.params.id });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete product
router.delete(
  "/delete-seller-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("No product found with this id", 500));
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
