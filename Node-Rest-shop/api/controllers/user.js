const mongoose = require("mongoose");
// Importing user's schema module
const User = require("../models/user.js");
// Importing bcrypt module.
const bcrypt = require("bcrypt");
//Importing jwt
const jwt = require("jsonwebtoken");
// It is required for reading env files.
const dotnev = require("dotenv");
dotnev.config({
	path: `./config.env`,
});

exports.get_all_users = function (req, res, next) {
	User.find()
		.then(function (users) {
			res.status(201).json({
				user: users,
			});
		})
		.catch(function (err) {
			res.status(500).json({
				error: err,
			});
		});
};
exports.signup = function (req, res, next) {
	// Creating a new user on signup

	// Checking if the user already exists in our database or not.
	User.find({ email: req.body.email }).then(function (user) {
		if (user.length >= 1) {
			res.status(404).json({
				message: "email address already exsists",
			});
		} else {
			//Encrypting our passwords
			bcrypt.hash(req.body.password, 10, function (err, hash) {
				if (err) {
					return res.status(500).json({
						error: err,
					});
				} else {
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						email: req.body.email,
						// Here there is a huge security flaw, we are storing our password in plain text format in our database. If this database is attacked by some malicious user than he/she can access all our passwords, which is a huge security flaw. So we need to encrypt our password.
						// For encrypting our password we will be using bcrypt package.
						// password: req.body.password,
						password: hash,
					});
					user.save()
						.then(function (result) {
							res.status(201).json({
								messages: "User created",
							});
						})
						.catch(function (err) {
							res.status(500).json({
								error: err,
							});
						});
				}
			});
		}
	});
};
exports.login = function (req, res, next) {
	User.find({ email: req.body.email }).then(function (user) {
		if (user.length < 1) {
			return res.status(401).json({
				message: "Authrorisation Failed",
			});
		}
		bcrypt.compare(
			req.body.password,
			user[0].password,
			function (err, result) {
				if (err) {
					return res.status(401).json({
						message: "Authrorisation Failed",
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							email: user[0].email,
							id: user[0].id,
						},
						process.env.PRIVATE_KEY,
						{
							expiresIn: "1h",
						},
					);
					return res.status(200).json({
						message: "Aithentication Successful",
						token: token,
					});
				}
			},
		);
	});
};
exports.delete_user = function (req, res, next) {
	User.findByIdAndRemove(req.params.id)
		.then(function () {
			res.status(201).json({
				message: "user deleted",
			});
		})
		.catch(function (err) {
			res.status(500).json({
				error: err,
			});
		});
};
