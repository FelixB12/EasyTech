const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// User Model
const User = require("../models/users");

// TODO DELETE THIS

// @route POST /User
// @desc Store new User
router.post("/", (req, res, next) => {
  // Object to store in DB
  const signUp = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    password: req.body.password,
  });

  // Store in db
  signUp
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST Requests to /signup",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
  /** OR do this??
   *  singUp.save().then(item => res.json(item);
   */
});

// TODO Delete this, Test GET
// Get all Users we have in DB
router.get("/", (req, res, next) => {
  User.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// TODO Add a get to check if the User with the Email already exists in the DB

module.exports = router;
