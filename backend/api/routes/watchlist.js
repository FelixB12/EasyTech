const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Watchlist = require("../models/watchlist");
const User = require("../models/users");

const passport = require("../../auth/auth");
/**
 * //TODO
 * Should we check that the watchlist is asosciated to a valid account?
 *
 * Embed watchlist schema inside user...
 */

/**
 * Create New Watch List
 */
// TODO add watchlist to user('userWatchlists'), Check query populate
router.post("/create", (req, res, next) => {
  const userId = req.body.userId;
  // Object to store in DB
  const watchlist = new Watchlist({
    _id: new mongoose.Types.ObjectId(),
    watchlistName: req.body.watchlistName,
    watchlistSymbols: undefined,
  });

  User.findById(userId, (err, user) => {
    if (user) {
      watchlist
        .save()
        .then((result) => {
          user.watchlists.push(watchlist);
          user.save();
          res.status(200).json({ info: "Watchlist Created" });
        })
        .catch((err) => {
          res.status(400).json({ info: "Error Occured" });
        });
    } else {
      res.status(400).json({ info: "User does not exist" });
    }
  });
});
/**
 * Add/Remove Symbols in Watch List
 */
router.patch("/addSymbol", (req, res, next) => {
  // TODO Get the watchlist from the user model and add the symble there
  const id = req.body.id;
  const symbol = req.body.watchlistSymbol;
  Watchlist.exists({ _id: id }) // Check if the Watchlist exists with the ID
    .then((exists) => {
      if (exists) {
        console.log("Watchlist Exists");
        Watchlist.exists({ _id: id, watchlistSymbols: symbol }) // Check if the Symbol exists with the ID
          .then((symbolExist) => {
            if (symbolExist) {
              console.log("Symbol Exists: " + symbol);
              res.status(400).json("Symbol Already exists");
            } else {
              Watchlist.findByIdAndUpdate(
                // Add Symbol if the symbol doesn't exist
                { _id: id },
                { $push: { watchlistSymbols: symbol } },
                { useFindAndModify: false }
              )
                .exec()
                .then((result) => {
                  console.log("Added new Symbol: " + symbol);
                  res.status(200).json("Symbol added"); // TODO return proper JSON
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({ error: err });
                });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      } else {
        console.log("Watchlist Does not Exist");
        res.status(400).json("Watchlist Does not exist"); // TODO return error code with proper JSON
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * Remove Symbol from Watch List
 */
router.patch("/removeSymbol", (req, res, next) => {
  const id = req.body.id;
  const symbol = req.body.watchlistSymbol;

  Watchlist.exists({ _id: id })
    .then((exists) => {
      if (exists) {
        // Check if symbol exist for the watchlist
        console.log("Watchlist exists attempting to remove symbol");
        Watchlist.update(
          { _id: id },
          { $pull: { watchlistSymbols: symbol } },
          { multi: true }
        )
          .then((err) => {
            res.status(200).json(err);

            if (err.nModified > 0) {
              console.log("Symbol removed from watchlist: " + symbol);
            } else {
              console.log(
                "Symbol: " +
                  symbol +
                  " does not exist in watchlist, no symbol was removed"
              );
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      } else {
        console.log("Watchlist doesn't Exists");
        res.status(400).json("Watchlist doesn't exist"); // TODO return proper json and error code
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * Delete Watchlist from database
 */
// TODO remove watchlist from user('userWatchlists'), Check query populate
router.delete("/deleteWatchlist", (req, res, next) => {
  const id = req.query.watchlistId; //Watchlist id
  const userId = req.query.userId;
  // TODO Fix deleteWatchlist properly
  Watchlist.findByIdAndDelete({ _id: id })
    .then((result) => {
      console.log(result);
      res.status(200).json("Watchlist From Watchlist Deleted");
    })
    .catch((err) => {
      console.log("Error Deleting Watchlist");
      res.status(500).json("Error Deleting");
    });

  /*
          User.findByIdAndUpdate({ _id: userId }, { $pull: { watchlists: id } })
        .then((res) => {
          console.log("Updated");
          res.status(200).json("Watchlist From User Deleted");
        })
        .catch((err) => {
          res.status(500).json("Error Deleting");
        });

    */
});

/**
 * Get single Watchlist
 */
router.get("/getSingleWatchlist/:watchlistId", (req, res, next) => {
  const id = req.query.watchlistId;
  console.log("ID: " + id);
  Watchlist.find({ _id: id }, "watchlistSymbols watchlistName")
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("ID: " + id);
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * Get All watchlists associated to the user
 */
// router.get("/getWatchlists", (req, res, next) => {
//   passport.authenticate("jwt", function (err, user, info) {
//     if (err) {
//       res.json(info);
//       //return next(err);
//     }
//     if (user) {
//       res.json(info);
//     } else {
//       res.json(info);
//     }
//     res.json("Success");
//   })(req, res, next);

//   Watchlist.find()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// TODO Retrive error when failed to authenticate
router.get("/getWatchlists", function (req, res, next) {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) {
      //   res.json(info);
      return next(err);
    }
    if (user) {
      console.log(user);
      User.findById(user.id)
        .populate("watchlists")
        .then((result) => {
          res.json({
            watchlists: result.watchlists,
            info: { code: 200, info },
          });
        });
    } else {
      res.json({ watchlists: [], info: { code: 400, info } });
    }
  })(req, res, next);
});

/**
 * // TODO
 * Re-name Watchlist
 */

module.exports = router;
