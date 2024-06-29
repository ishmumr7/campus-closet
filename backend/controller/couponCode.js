const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CouponCode = require("../model/couponCode");
const router = express.Router();

// create coupon code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodeExists = await CouponCode.find({
        name: req.body.name,
      });

      if (couponCodeExists.length !== 0) {
        return next(new ErrorHandler("Coupon code already exists!", 400));
      }

      const couponCode = await CouponCode.create(req.body);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all coupons seller
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res) => {
    try {
      const couponCodes = await CouponCode.find({ sellerId: req.params.id });

      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete coupon
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async(req, res) => {
    try {
      const couponId = req.params.id;
      const couponCode = await CouponCode.findByIdAndDelete(couponId);

      if (!couponCode) {
        return next(new ErrorHandler("No event found with this id", 500));
      }

      res.status(201).json({
        success: true,
        message: "Coupon Deleted Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
)

module.exports = router;
