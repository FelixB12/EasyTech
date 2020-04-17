const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  emailAddress: { type: String, required: true, unique: true },
  // Check out for pasword hashing and salting: https://stackoverflow.com/questions/14588032/mongoose-password-hashing
  // passwordHash:
  // passwordSalt
});
