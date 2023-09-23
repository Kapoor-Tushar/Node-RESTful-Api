// Implementing user routes functionality
// Importing express
const express = require("express");
const router = express.Router();
// Importing mongoose
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
const checkAuth = require("../auth/check-auth.js");

const userController = require("../controllers/user.js");

// Creating getting all users
router.get("/", checkAuth, userController.get_all_users);

// Creating route for signup
router.post("/signup", userController.signup);

// Implementing route for login
router.post("/login", userController.login);

// Deleting a user
router.delete("/:id", userController.delete_user);

module.exports = router;
