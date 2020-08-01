const mongoose = require("mongoose");

const watchListSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  watchlistName: { type: String, required: true },
  watchlistSymbols: [{ type: String, default: undefined }],
  watchlistCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Watchlist", watchListSchema);
