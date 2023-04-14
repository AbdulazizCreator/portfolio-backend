const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please add a name of a photo"],
  },
});

module.exports = mongoose.model("Photo", PhotoSchema);
