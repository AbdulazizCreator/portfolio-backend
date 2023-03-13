const asyncHandler = require("../middleware/async");
const Experience = require("../models/Experience");
const ErrorResponse = require("../utils/errorResponse");

exports.getExperiences = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    return next(
      new ErrorResponse(`Experience not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: experience,
    msg: `Show experience ${req.params.id}`,
  });
});

exports.createExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.create(req.body);
  res
    .status(201)
    .json({ success: true, data: experience, msg: `Create new experience` });
});

exports.updateExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!experience) {
    return next(
      new ErrorResponse(`Experience not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    date: experience,
    msg: `Update experience ${req.params.id}`,
  });
});

exports.deleteExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) {
    return next(
      new ErrorResponse(`Experience not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: null,
    msg: `Delete experience ${req.params.id}`,
  });
});
