const asyncHandler = require("../middleware/async");
const Portfolio = require("../models/Portfolio");
const Photo = require("../models/Photo");
const ErrorResponse = require("../utils/errorResponse");

exports.getPortfolios = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getPortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio) {
    return next(
      new ErrorResponse(`Portfolio not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json(portfolio);
});

exports.createPortfolio = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const photo = await Photo.findById(req.body.photo);

  if (!photo) {
    return next(
      new ErrorResponse(`No photo with the id of ${req.body.photo}`, 404)
    );
  }
  const portfolio = await Portfolio.create(req.body);
  res.status(201).json(portfolio);
});

exports.updatePortfolio = asyncHandler(async (req, res, next) => {
  let portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio) {
    return next(
      new ErrorResponse(`Portfolio not found with id of ${req.params.id}`, 404)
    );
  }
  if (portfolio.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this !`,
        401
      )
    );
  }
  portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(portfolio);
});

exports.deletePortfolio = asyncHandler(async (req, res, next) => {
  let portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio) {
    return next(
      new ErrorResponse(`Portfolio not found with id of ${req.params.id}`, 404)
    );
  }
  if (portfolio.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this !`,
        401
      )
    );
  }
  portfolio.remove();
  res.status(200).json(null);
});
