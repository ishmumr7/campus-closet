const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const Product = require("../model/product");
const Shop = require("../model/user")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// Create Procuct
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellerId = req.body.sellerId;
      const seller = await User.findById(sellerId);

      if(!seller) {
        return next(new ErrorHandler("Invalid Seller Id!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.fileName}`);
        const productData = req.body;
        productData.images = imageUrls;
        productData.seller = seller;

        const product = await Product.create(productData);

        res.status(200).json({
          success: true,
          product,
        })
      }

    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;