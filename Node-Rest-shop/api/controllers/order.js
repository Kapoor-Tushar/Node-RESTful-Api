const Order = require("../models/order.js");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products.js");

exports.orders_get_all = function (req, res, next) {
	Order.find()
		.select("product quantity _id")
		.then(function (docs) {
			res.status(200).json({
				count: docs.length,
				orders: docs.map(function (doc) {
					return {
						_id: doc._id,
						product: doc.product,
						quantity: doc.quantity,
						request: {
							type: "GET",
							url: "http://localhost:9000/orders/" + doc._id,
						},
					};
				}),
			});
		})
		.catch(function (err) {
			res.status(500).json({
				error: err,
			});
		});
};
exports.orders_post = function (req, res, next) {
	Product.findById(req.body.id)
		.then(function (product) {
			if (!product) {
				return res.status(404).json({
					message: "Product not found",
				});
			}
			const order = new Order({
				_id: mongoose.Types.ObjectId(),
				quantity: req.body.quantity,
				product: req.body.id,
			});
			order
				.save()
				.then(function (result) {
					res.status(201).json({
						result,
					});
				})
				.catch(function (err) {
					res.status(404).json({
						status: "fail",
						message: err,
					});
				});
		})
		.catch(function (err) {
			res.status(500).json({
				message: "Product not found",
				error: err,
			});
		});
};

exports.orders_get_specific_order = function (req, res, next) {
	Order.findById(req.params.id)
		.then(function (order) {
			res.status(200).json({
				order: order,
				request: {
					type: "GET",
					url: "http://localhost:9000/orders",
				},
			});
		})
		.catch(function (err) {
			res.status(500).json({
				error: err,
			});
		});
};

exports.orders_delete = function (req, res, next) {
	Order.findByIdAndRemove(req.params.id)
		.then(function () {
			res.status(200).json({
				message: "Deleted Order",
			});
		})
		.catch(function (err) {
			res.status(500).json({
				error: err,
			});
		});
};
