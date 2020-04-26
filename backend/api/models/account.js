const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  createDate: { Type: Date, default: Date.now },
  accountType: String,
});
