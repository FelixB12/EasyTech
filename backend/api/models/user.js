const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  // Check out for pasword hashing and salting: https://stackoverflow.com/questions/14588032/mongoose-password-hashing
  password: { type: String, required: true },
  // passwordHash:
  // passwordSalt
});
// TODO USe Passport.js for authentication, bcrypt for passwords
module.exports = mongoose.model("User", userSchema);
