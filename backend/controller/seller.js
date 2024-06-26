const express = require("express");
const path = require("path");
const User = require("./../model/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");

// create shop
router.post(
  "/create-seller",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password, address, phoneNumber, zipCode } = req.body;
      const emailExists = await User.findOne({ email });
      if (!emailExists) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }
      try {
        await User.updateOne({ email: email }, { $set: { role: "seller" } });
      } catch (err) {
        return next(new ErrorHandler(err.message, 400));
      }

      res.status(200).json({
        success: true,
        message: "Successfully registered as seller!",
      });

      
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// // load seller
// router.get(
//   "/getSeller",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const seller = await Seller.findById(req.seller._id);

//       if (!seller) {
//         return next(new ErrorHandler("User doesn't exists", 400));
//       }

//       res.status(200).json({
//         success: true,
//         seller,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = router;
