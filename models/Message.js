const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    minLength: 5,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  whom: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  answer: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
