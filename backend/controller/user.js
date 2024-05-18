const express = require("express");
const path = require("path");
const User = require("./../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

router.post("/create-user", async (req, res, next) => {
  const { name, email, password, phoneNumber, address } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("User already exists", 400));
  }

  // const filename = req.file.filename;
  // const fileUrl = path.join(filename);

  const user = {
    name: name,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    addresses: [
      {
        address1: address,
      },
    ],
  };

  const activationToken = createActivationToken(user);

  const activationUrl = `http://localhost:3000/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate Your Account - Campus Closet",
      message: `Greetings ${user.name}, \nWelome to Campus Closet - UTM's Student Marketplace. Click on the link below to activate your account! \n${activationUrl}`,
    });
    res.status(201).json({
      success: true,
      message: `Please check your email (${user.email}) to activate your account.`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate User
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, phoneNumber, addresses } = newUser;

      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists!"), 400);
      }

      try {
        user = await User.create({
          name,
          email,
          password,
          phoneNumber,
          addresses,
        });

        // Send token
        sendToken(user, 201, res);
      } catch (creationError) {
        console.error("Error during user creation:", creationError);
        return next(new ErrorHandler(creationError.message, 500));
      }

      // sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
