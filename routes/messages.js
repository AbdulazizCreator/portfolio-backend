const express = require("express");
const {
  sendMessage,
  answerMessage,
  deleteMessage,
  getMessages,
  getMessage,
} = require("../controllers/messages");

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const Message = require("../models/Message");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(sendMessage)
  .get(
    // authorize("admin", "client"),
    advancedResults(Message, {
      path: "user",
      select: "username firstName lastName",
    }),
    getMessages
  );

router
  .route("/:id")
  .get(authorize("admin", "client"), getMessage)
  .put(authorize("admin", "client"), answerMessage)
  .delete(authorize("admin", "client"), deleteMessage);

module.exports = router;
