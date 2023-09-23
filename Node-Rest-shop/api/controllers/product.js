const Product = require("../models/products.js");
const mongoose = require("mongoose");

exports.get_all_products = function (req, res, next) {
	Product.find()
		.then(function (docs) {
			res.status(200).json({ docs });
		})
		.catch(function (err) {
			res.status(500).json({
				error: err,
			});
		});
};
exports.post_products = function (req, res, next) {
	console.log(req.file);
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path,
	});
	product
		.save()
		.then(function (result) {
			console.log(result);
		})
		.catch((err) => console.log(err));

	res.status(201).json({
		message: "Handling POST requests to /products",
		createdProduct: product,
	});
};
exports.get_specific_product = function (req, res, next) {
	const id = req.params.id;
	Product.findById(id)
		.then(function (data) {
			res.status(200).json({
				status: "success",
				data: data,
			});
		})
		.catch(function (err) {
			res.status(404).json({
				status: "fail",
				message: err,
			});
		});
};
exports.update_product = function (req, res, next) {
	const doc = Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
		.then(function (docs) {
			res.status(200).json({
				message: "Updated product!",
				docs: docs,
			});
		})
		.catch(function (err) {
			res.status(404).json({
				status: "fail",
				message: err,
			});
		});
};
exports.delete_product = function (req, res, next) {
	Product.findByIdAndDelete(req.params.id).then(function () {
		res.status(200)
			.json({
				message: "Deleted product!",
			})
			.catch(function (err) {
				res.status(500).json({
					error: err,
				});
			});
	});
};
