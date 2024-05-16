const express = require("express");
const path = require("path");
const User = require("./../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

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
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 400))
  }
});

// Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate User

module.exports = router;
