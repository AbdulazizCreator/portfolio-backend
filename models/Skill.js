const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name of skill"],
  },
  percent: {
    type: Number,
    required: [true, "Please add a level in percent"],
  },
});

module.exports = mongoose.model("Skill", SkillSchema);
