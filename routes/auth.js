const express = require("express");
const {
  register,
  login,
  getMe,
  updateDetails,
  uploadUserImage,
  updatePassword,
  deleteUserImage,
} = require("../controllers/auth");

const advancedResults = require("../middleware/advancedResults");
const Message = require("../models/Message");

const { getUserMessages } = require("../controllers/messages");

router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);
router.post("/upload", protect, uploadUserImage);
router.delete("/upload/:file", protect, deleteUserImage);
router.get(
  "/messages",
  protect,
  advancedResults(Message, null, true),
  getUserMessages
);

module.exports = router;
