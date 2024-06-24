const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("./../model/user");

exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
  const {token} = req.cookies;

  if(!token) {
    return next(new ErrorHandler("Please Login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
})

exports.isSeller = catchAsyncErrors(async(req, res, next) => {
  return (req, res, next) => {
    if (req.user.role !== 'seller') {
      return next(new ErrorHandler(`Role ${role} is required to access this resource`, 403));
    }
    next();
  };
});