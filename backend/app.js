const express = require("express");
const app = express();
const morgan = require("morgan"); // For logging requests
const mongoose = require("mongoose");

// TODO add additional api routes here
const productRoutes = require("./api/routes/products");
const stocksRoutes = require("./api/routes/stocks");
const signUpRoutes = require("./api/routes/signup");

// DB Connection, TODO If using a db on the cloud server change the connection here
const db = require("./config/keys");
mongoose
  .connect(db.mongoURILocal, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Log requests
app.use(morgan("dev"));

// For every respons, add a header to the response for  Cross-Origin resource sharing; see https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
// This is done to prevent CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // TODO Instead of * we can restrict it to only allow access to our website https://Easy-Tech.ca
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // TODO can add more access

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Parse Incoming requst bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes which should handle requests
// TODO Add additonal routes
app.use("/products", productRoutes); // When URI start with 'products' use the productRoutes
app.use("/signup", signUpRoutes);
// TODO add cookieParser() ???
//app.use("/stocks", stocksRoutes); // When URI start with 'stocks' use the stocksRoutes

// ERROR HANDLING
// Anything that goes past the above means that there was nothing suitable found to handle the requests so we error handle them here
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
