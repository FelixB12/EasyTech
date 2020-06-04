const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Check out for pasword hashing and salting: https://stackoverflow.com/questions/14588032/mongoose-password-hashing
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  // passwordHash:
  // passwordSalt
  //userWatchlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Watchlist" }],
});
// TODO USe Passport.js for authentication, bcrypt for passwords
module.exports = mongoose.model("Users", usersSchema);
