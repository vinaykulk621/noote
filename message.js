/** @format */

const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
});

const Msg = mongoose.model("messages", msgSchema);
module.exports = Msg;
