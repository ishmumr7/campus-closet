const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const Event = require("../model/event");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Event
router.post(
  "/create-event",
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
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.seller = seller;

        const product = await Event.create(eventData);

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

module.exports = router;