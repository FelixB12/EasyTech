const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Watchlist = require("../models/watchlist");
const User = require("../models/users");
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
  //  const userId = req.body.userId;
  //var watchlistUserId;
  // Object to store in DB
  const watchlist = new Watchlist({
    _id: new mongoose.Types.ObjectId(),
    watchlistName: req.body.watchlistName,
    // TODO point watchlist to the correct user
    //accountNumber: req.body.accountNumber,
    //watchlistId: req.body.watchlistId,
    //watchlistUser: req.body.userId,
    symbols: "",
  });

  console.log(req.body.watchlistName);
  // Store new watchlist in db
  watchlist
    .save()
    .then((result) => {
      console.log(result);
      //   watchlistUserId = result._id;
      res.status(201).json({
        message: "Handling POST Requests to /watchlist/create",
        createdProduct: result,
      });
      // Update the User with the new WatchlistId
      //   User.findByIdAndUpdate(
      //     { _id: userId },
      //     { $push: { userWatchlists: watchlistUserId } }
      //   )
      //     .then((result) => {
      //       // What if UserId was not found?
      //       console.log("User was updated with new watchlist");
      //     })
      //     .catch((err) => {
      //       res.status(500).json(err);
      //     });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
/**
 * Add/Remove Symbols in Watch List
 */
router.patch("/addSymbol", (req, res, next) => {
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
router.delete("/deleteWatchlist/:watchlistId", (req, res, next) => {
  const id = req.query.watchlistId; //Watchlist id

  Watchlist.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount > 0) {
        console.log("Watchlist deleted");
        res.status(200).json(result);
      } else {
        console.log("Watchlist to delete doesn't exist");
        res.status(400).json(result);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(id);
    });
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
router.get("/getUserWatchlists", (req, res, next) => {
  const userId = req.body.userId;

  User.find({ _id: userId })
    .populate("userWatchlists")
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * GET ALL WATCHLISTS TEST, TODO DELETE THIS AFTER TESTING
 * TODO DELETE THIS
 */
/**
 * Get All watchlists associated to the user
 */
router.get("/getWatchlists", (req, res, next) => {
  const userId = req.body.userId;

  Watchlist.find()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/**
 * // TODO
 * Re-name Watchlist
 */

module.exports = router;
