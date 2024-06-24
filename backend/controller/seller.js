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

      // const user = {
      //   name: name,
      //   email: email,
      //   password: password,
      //   address: address,
      //   phoneNumber: phoneNumber,
      //   zipCode: zipCode,
      //   role: "seller"
      // };

      // const activationToken = createActivationToken(seller);
      // const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;
      // try {
      //   await sendMail({
      //     email: seller.email,
      //     subject: "Activate Your Seller Account",
      //     message: `Hello ${seller.name}, please click on the link to activate your seller account: ${activationUrl}`,
      //   });
      //   res.status(201).json({
      //     success: true,
      //     message: `Please check your email:- ${seller.email} to activate your seller account!`,
      //   });
      // } catch (error) {
      //   return next(new ErrorHandler(error.message, 500));
      // }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// create activation token
// const createActivationToken = (seller) => {
//   return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
//     expiresIn: "5m",
//   });
// };

// activate user
// router.post(
//   "/activation",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { activation_token } = req.body;

//       const newSeller = jwt.verify(
//         activation_token,
//         process.env.ACTIVATION_SECRET
//       );

//       if (!newSeller) {
//         return next(new ErrorHandler("Invalid token", 400));
//       }
//       const { name, email, password, avatar, zipCode, address, phoneNumber } =
//         newSeller;

//       let seller = await Seller.findOne({ email });

//       if (seller) {
//         return next(new ErrorHandler("User already exists", 400));
//       }

//       try {
//         seller = await Seller.create({
//           name,
//           email,
//           avatar,
//           password,
//           zipCode,
//           address,
//           phoneNumber,
//         });
//         sendSellerToken(seller, 201, res);
//       } catch (creationError) {
//         console.error("Error during user creation:", creationError);
//         return next(new ErrorHandler(creationError.message, 500));
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// login shop
// router.post(
//   "/login-seller",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { email, password } = req.body;

//       if (!email || !password) {
//         return next(new ErrorHandler("Please provide the all fields!", 400));
//       }

//       const user = await Seller.findOne({ email }).select("+password");

//       if (!user) {
//         return next(new ErrorHandler("User doesn't exists!", 400));
//       }

//       const isPasswordValid = await user.comparePassword(password);

//       if (!isPasswordValid) {
//         return next(
//           new ErrorHandler("Please provide the correct information", 400)
//         );
//       }

//       sendSellerToken(user, 201, res);
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

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
