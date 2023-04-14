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
  .post(protect, authorize("admin", "client"), createExperience);

router
  .route("/:id")
  .get(getExperience)
  .put(protect, authorize("admin", "client"), updateExperience)
  .delete(protect, authorize("admin", "client"), deleteExperience);

module.exports = router;
