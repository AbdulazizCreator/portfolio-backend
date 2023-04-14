const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  workName: {
    type: String,
    required: [true, "Please add a work name"],
  },
  companyName: {
    type: String,
    required: [true, "Please add a company name"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Experience", ExperienceSchema);
