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
  res.status(200).json(experience);
});

exports.createExperience = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const experience = await Experience.create(req.body);
  res.status(201).json(experience);
});

exports.updateExperience = asyncHandler(async (req, res, next) => {
  let experience = await Experience.findById(req.params.id);

  if (!experience) {
    return next(
      new ErrorResponse(`Experience not found with id of ${req.params.id}`, 404)
    );
  }
  if (experience.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this !`,
        401
      )
    );
  }
  experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(experience);
});

exports.deleteExperience = asyncHandler(async (req, res, next) => {
  let experience = await Experience.findById(req.params.id);
  if (!experience) {
    return next(
      new ErrorResponse(`Experience not found with id of ${req.params.id}`, 404)
    );
  }
  if (experience.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this !`,
        401
      )
    );
  }
  experience.remove();
  res.status(200).json(null);
});
