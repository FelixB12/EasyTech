const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  watchlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Watchlist" }],
});

module.exports = mongoose.model("Users", usersSchema);
