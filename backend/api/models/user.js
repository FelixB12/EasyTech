const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  emailAddress: { type: String, required: true, unique: true },
  // Check out for pasword hashing and salting: https://stackoverflow.com/questions/14588032/mongoose-password-hashing
  password: String,
  // passwordHash:
  // passwordSalt
});
