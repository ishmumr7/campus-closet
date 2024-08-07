const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const fs = require("fs");
const Product = require("../model/product");
const User = require("../model/user");
const Order = require("../model/order");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");

// Create Procuct
router.post(
	"/create-product",
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
				const productData = req.body;
				productData.images = imageUrls;
				productData.seller = seller;

				const product = await Product.create(productData);

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

//Get seller products
router.get(
	"/get-all-products-seller/:id",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const products = await Product.find({ sellerId: req.params.id });
			res.status(201).json({
				success: true,
				products,
			});
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);

// get all products
router.get(
	"/get-all-products",
	catchAsyncErrors(async (req, res, next) => {
		try {
			const products = await Product.find().sort({ createdAt: -1 });

			res.status(201).json({
				success: true,
				products,
			});
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);

// review for a product
router.put(
	"/create-new-review",
	isAuthenticated,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const { user, rating, comment, productId, orderId } = req.body;

			const product = await Product.findById(productId);

			const review = {
				user,
				rating,
				comment,
				productId,
			};

			const isReviewed = product.reviews.find(
				(rev) => rev.user._id === req.user._id
			);

			if (isReviewed) {
				product.reviews.forEach((rev) => {
					if (rev.user._id === req.user._id) {
						(rev.rating = rating), (rev.comment = comment), (rev.user = user);
					}
				});
			} else {
				product.reviews.push(review);
			}

			let avg = 0;

			product.reviews.forEach((rev) => {
				avg += rev.rating;
			});

			product.ratings = avg / product.reviews.length;

			await product.save({ validateBeforeSave: false });

			await Order.findByIdAndUpdate(
				orderId,
				{ $set: { "cart.$[elem].isReviewed": true } },
				{ arrayFilters: [{ "elem._id": productId }], new: true }
			);

			res.status(200).json({
				success: true,
				message: "Reviwed succesfully!",
			});
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);

// Delete product
router.delete(
	"/delete-seller-product/:id",
	isSeller,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const productId = req.params.id;
			const productData = await Product.findById(productId);

			// Delete Image
			productData.images.forEach((imgUrl) => {
				const filename = imgUrl;
				const filepath = `uploads/${filename}`;

				fs.unlink(filepath, (err) => {
					console.log(err);
				});
			});

			// Delete product from db
			const product = await Product.findByIdAndDelete(productId);

			if (!product) {
				return next(new ErrorHandler("No product found with this id", 500));
			}

			res.status(201).json({
				success: true,
				message: "Product Deleted Successfully",
			});
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);

// all products --- for admin
router.get(
	"/admin-all-products",
	isAuthenticated,
	isAdmin,
	catchAsyncErrors(async (req, res, next) => {
		try {
			const products = await Product.find().sort({
				createdAt: -1,
			});
			res.status(201).json({
				success: true,
				products,
			});
		} catch (error) {
			return next(new ErrorHandler(error.message, 500));
		}
	})
);

module.exports = router;
