const express = require("express");
const {
  getPortfolios,
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolios");

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const Portfolio = require("../models/Portfolio");

const router = express.Router();

router
  .route("/")
  .get(
    advancedResults(Portfolio, {
      path: "photo",
      select: "name",
    }),
    getPortfolios
  )
  .post(protect, authorize("admin", "client"), createPortfolio);

router
  .route("/:id")
  .get(getPortfolio)
  .put(protect, authorize("admin", "client"), updatePortfolio)
  .delete(protect, authorize("admin", "client"), deletePortfolio);

module.exports = router;
