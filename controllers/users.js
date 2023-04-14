const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc   Get all users
// @route  GET /api/v1/auth/users
// @access Private

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc   Get single user
// @route  GET /api/v1/auth/users/:id
// @access Private

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json(user);
});

// @desc   Create user
// @route  POST /api/v1/auth/users
// @access Private/Admin

exports.createUser = asyncHandler(async (req, res, next) => {
  // Check for user
  const user = await User.findOne({ username });

  if (user) {
    return next(new ErrorResponse("Bu foydalanuvchi mavjud !", 400));
  }

  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

// @desc   Update user
// @route  PUT /api/v1/auth/users/:id
// @access Private/Admin

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json(user);
});

// @desc   Delete user
// @route  DELETE /api/v1/auth/users/:id
// @access Private/Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json(null);
});
