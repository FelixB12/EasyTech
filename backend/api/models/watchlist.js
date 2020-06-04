const mongoose = require("mongoose");

const watchListSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // TODO set UserId
  accountNumber: String,
  watchlistId: String,
  watchlistName: { type: String, required: true },
  watchlistSymbols: [{ type: String, unique: true }],
  watchlistCreated: { type: Date, default: Date.now },
  watchlistUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Watchlist", watchListSchema);
