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
  res.status(200).json({
    success: true,
    data: portfolio,
    msg: `Show Portfolio ${req.params.id}`,
  });
});

exports.createPortfolio = asyncHandler(async (req, res, next) => {
  const photo = await Photo.findById(req.body.photo);

  if (!photo) {
    return next(
      new ErrorResponse(
        `No photo with the id of ${req.body.photo}`,
        404
      )
    );
  }
  const portfolio = await Portfolio.create(req.body);
  res
    .status(201)
    .json({ success: true, data: portfolio, msg: `Create new portfolio` });
});

exports.updatePortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!portfolio) {
    return next(
      new ErrorResponse(`Portfolio not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    date: portfolio,
    msg: `Update portfolio ${req.params.id}`,
  });
});

exports.deletePortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
  if (!portfolio) {
    return next(
      new ErrorResponse(`Portfolio not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: null,
    msg: `Delete portfolio ${req.params.id}`,
  });
});
