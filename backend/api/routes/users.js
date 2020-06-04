const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passport = require("passport");
const localStrategy = require("passport-local");

// User Model
const Users = require("../models/users");

/**
 * @route POST /users/register
 * @desc Register new User
 * @access Public
 */
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validation
  // TODO  Improve validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing User
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400).json({ msg: "User already exists" });
      } else {
        const newUser = new Users({
          _id: new mongoose.Types.ObjectId(),
          firstName,
          lastName,
          email,
          password,
        });

        // Create Salt & Hash
        bcrypt.genSalt(11, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                jwt.sign(
                  { id: user.id },
                  process.env.JWT_SECRET,
                  { expiresIn: 3600 },
                  (err, token) => {
                    if (err) throw err;
                    res.json({
                      token,
                      user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                      },
                    });
                  }
                );
              })
              .catch((err) => {
                res.status(400).json(err);
                console.log(err);
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

/**
 * @route GET /users/auth
 * @desc Authenticate User / Login
 * @access Public
 */
router.post("/auth", (req, res) => {
  const { username, password } = req.body; // Note, username is the email
  // Validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  passport.use(new localStrategy((username, password, done) => {}));

  // Check for existing User
  Users.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(400).json({ msg: "User Doesn't exists" });
      } else {
        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            res.status(400).json({ msg: "Invalid Credentials" });
          } else {
            jwt.sign(
              { id: user.id },
              process.env.JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                  },
                });
              }
            );
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});
module.exports = router;
