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
    authorize("admin"),
    advancedResults(Message, {
      path: "user",
      select: "username first_name last_name",
    }),
    getMessages
  );

router
  .route("/:id")
  .get(getMessage)
  .put(answerMessage)
  .delete(deleteMessage);

module.exports = router;
