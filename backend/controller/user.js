const express = require("express");
const path = require("path");
const User = require("./../model/user")
const router = express.Router();
const {upload} = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/create-user",  async (req, res, next) => {
  const { name, email, password, phoneNumber, address1 } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const user = {
    name: name,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    addresses: {
      address1: address1,
    },
    avatar: null,
  };

  console.log(user);
});

module.exports = router;