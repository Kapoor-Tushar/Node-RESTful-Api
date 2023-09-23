// This file will contain all the data required by our express application.
// Importing express module.
const express = require("express");
// It will put all the things present in express module in app variable.
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/product.js");
const orderRoutes = require("./api/routes/order.js");
const userRoutes = require("./api/routes/user.js");

// It is required for reading env files.
const dotnev = require("dotenv");
dotnev.config({
  path: `./config.env`,
});

// Connecting with mongoDB Cluster.
// Use the application connect method.
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(function (connect) {
    // console.log(connect.connections);
    console.log("DB connection successful");
  });

// Handling CORS
// It is a protection mechanism when we are using browser, postman simply ignores these types of errors.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorisation",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.urlencoded({ extended: false }));
// This will ensure that incoming data is always in json format.
app.use(bodyParser.json());

// Using a middleware to filter all the request stating from products to be handeled by the second argument i.e. productRoutes.
// It is also known as mounting routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

// use() method helps us to create a middleware
// app.use(function(req, res, next){
//  res.status(200).json({
//    status:'success',
//    message:'It works'
//  })
//  next();
// })

// Handling Errors
// We will be using a middleware for this
app.use(function (req, res, next) {
  const error = new Error("Not Found");
  error.status = 404;
  // This will help us to forward this error
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Exporting app
module.exports = app;
