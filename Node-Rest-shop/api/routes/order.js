// This file will contain all the routes related to our orders

// Importing express
const express = require("express");

// Importing router
// It helps us to handle different routes reaching different endpoints with different HTTP verbs
const router = express.Router();

const mongoose = require("mongoose");
const Order = require("../models/order.js");
const Product = require("../models/products.js");

// Importing protect middleware
const checkAuth = require("../auth/check-auth.js");

const OrdersController = require("../controllers/order.js");
//Now we can start using the router to define different routes
// Get Request
router.get("/", checkAuth, OrdersController.orders_get_all);

// POST Request
router.post("/", checkAuth, OrdersController.orders_post);

// Setting up routes for individaul products
// GET Request
router.get("/:id", checkAuth, OrdersController.orders_get_specific_order);
// DELETE Request
router.delete("/:id", checkAuth, OrdersController.orders_delete);
module.exports = router;
