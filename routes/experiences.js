const express = require("express");
const {
  getExperiences,
  createExperience,
  getExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experiences");

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const Experience = require("../models/Experience");

const router = express.Router();

router
  .route("/")
  .get(advancedResults(Experience), getExperiences)
  .post(protect, authorize("admin"), createExperience);

router
  .route("/:id")
  .get(getExperience)
  .put(protect, authorize("admin"), updateExperience)
  .delete(protect, authorize("admin"), deleteExperience);

module.exports = router;
