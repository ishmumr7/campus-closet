const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const Event = require("../model/event");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");

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

        const event = await Event.create(eventData);

        res.status(200).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//Get seller events
router.get(
  "/get-all-events-seller/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ sellerId: req.params.id });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete event
router.delete(
  "/delete-seller-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const event = await Event.findByIdAndDelete(eventId);

      if (!event) {
        return next(new ErrorHandler("No event found with this id", 500));
      }

      res.status(201).json({
        success: true,
        message: "Event Deleted Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;