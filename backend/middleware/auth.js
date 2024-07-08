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

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const {token} = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (req.user.role !== 'seller') {
    return next(new ErrorHandler(`Role 'seller' is required to access this resource`, 403));
  }

  next();
});

exports.isAdmin = (...roles) => {
  return (req,res,next) => {
      if(!roles.includes(req.user.role)){
          return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
      };
      next();
  }
}