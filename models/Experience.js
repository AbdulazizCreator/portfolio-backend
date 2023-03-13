const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  work_name: {
    type: String,
    required: [true, "Please add a work_name"],
  },
  company_name: {
    type: String,
    required: [true, "Please add a company_name"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Experience", ExperienceSchema);
