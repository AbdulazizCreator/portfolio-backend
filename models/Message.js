const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    minLength: 15,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  answer: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Message", MessageSchema);
