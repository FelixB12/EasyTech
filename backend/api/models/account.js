const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  createDate: Date,
  accountType: String,
});
