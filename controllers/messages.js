const asyncHandler = require("../middleware/async");
const Message = require("../models/Message");
const ErrorResponse = require("../utils/errorResponse");

exports.getMessages = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    return next(
      new ErrorResponse(`Message not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is message owner
  if (message.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to get this message`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: message,
    msg: `Show message ${req.params.id}`,
  });
});

exports.sendMessage = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const message = await Message.create(req.body);
  res.status(200).json({ success: true, data: message });
});

exports.answerMessage = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin" && req.body.answer) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to answer this message`
      )
    );
  }

  const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: message });
});

exports.getUserMessages = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return next(
      new ErrorResponse(`Message not found with id of ${req.params.id}`, 404)
    );
  }
  // Make sure user is message owner
  if (message.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to get this message`,
        401
      )
    );
  }

  message.remove();

  res.status(200).json({ success: true, data: null });
});
