const express = require("express");
const {
  getSkills,
  createSkill,
  getSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skills");

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const Skill = require("../models/Skill");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Skill), getSkills)
  .post(protect, authorize("admin"), createSkill);

router
  .route("/:id")
  .get(getSkill)
  .put(protect, authorize("admin"), updateSkill)
  .delete(protect, authorize("admin"), deleteSkill);

module.exports = router;
