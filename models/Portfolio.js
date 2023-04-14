const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please add a name of project"],
  },
  url: {
    type: String,
    required: [true, "Please add a url of project"],
  },
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: "Photo",
    required: [true, "Please add a photo of project"],
  },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
