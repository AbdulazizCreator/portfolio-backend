const asyncHandler = require("../middleware/async");
const Skill = require("../models/Skill");
const ErrorResponse = require("../utils/errorResponse");

exports.getSkills = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getSkill = asyncHandler(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    return next(
      new ErrorResponse(`Skill not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json(skill);
});

exports.createSkill = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const skill = await Skill.create(req.body);
  res.status(201).json(skill);
});

exports.updateSkill = asyncHandler(async (req, res, next) => {
  let skill = await Skill.findById(req.params.id);
  if (!skill) {
    return next(
      new ErrorResponse(`Skill not found with id of ${req.params.id}`, 404)
    );
  }
  if (skill.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this !`,
        401
      )
    );
  }
  skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(skill);
});

exports.deleteSkill = asyncHandler(async (req, res, next) => {
  let skill = await Skill.findById(req.params.id);
  if (!skill) {
    return next(
      new ErrorResponse(`Skill not found with id of ${req.params.id}`, 404)
    );
  }
  if (skill.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this !`,
        401
      )
    );
  }
  skill.remove();
  res.status(200).json(null);
});
