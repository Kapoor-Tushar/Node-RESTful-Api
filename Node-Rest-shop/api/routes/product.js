// This file will contain all the routes related to our products

// Importing express
const express = require("express");

// Importing router
// It helps us to handle different routes reaching different endpoints with different HTTP verbs
const router = express.Router();

// Importing productschema
const Product = require("../models/products.js");
const mongoose = require("mongoose");

// Importing protect middleware
const checkAuth = require("../auth/check-auth.js");

const productController = require("../controllers/product.js");

// Importing multer package
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const fileFilter = function (req, file, cb) {
	// reject a file
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true); //Including files with these extensions.
	} else {
		cb(null, false);
	}
};
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});

//Now we can start using the router to define different routes
// Get Request
router.get("/", productController.get_all_products);
// Post Request
router.post(
	"/",
	checkAuth,
	upload.single("productImage"),
	productController.post_products,
);

// Setting up routes for individaul products
// GET Request
router.get("/:id", productController.get_specific_product);
// PATCH Request
router.patch("/:id", checkAuth, productController.update_product);
// DELETE Request
router.delete("/:id", checkAuth, productController.delete_product);
module.exports = router;
