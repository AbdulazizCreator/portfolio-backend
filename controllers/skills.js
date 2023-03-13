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
  res.status(200).json({
    success: true,
    data: skill,
    msg: `Show Skill ${req.params.id}`,
  });
});

exports.createSkill = asyncHandler(async (req, res, next) => {
  const skill = await Skill.create(req.body);
  res
    .status(201)
    .json({ success: true, data: skill, msg: `Create new skill` });
});

exports.updateSkill = asyncHandler(async (req, res, next) => {
  const skill = await Skill.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!skill) {
    return next(
      new ErrorResponse(`Skill not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    date: skill,
    msg: `Update skill ${req.params.id}`,
  });
});

exports.deleteSkill = asyncHandler(async (req, res, next) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) {
    return next(
      new ErrorResponse(`Skill not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: null,
    msg: `Delete skill ${req.params.id}`,
  });
});
