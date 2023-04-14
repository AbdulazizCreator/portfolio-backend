const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add a last name"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Please add a username"],
  },
  password: {
    type: String,
    select: false,
    minlenght: 6,
    required: [true, "Please add an password"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "client"],
  },
  fields: {
    type: [String],
  },
  client: {
    type: Boolean,
    default: false,
  },
  info: {
    type: String,
    minlength: 10,
  },
  phoneNumber: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  github: {
    type: String,
  },
  likedin: {
    type: String,
  },
  telegram: {
    type: String,
  },
  instagram: {
    type: String,
  },
  youtube: {
    type: String,
  },
  facebook: {
    type: String,
  },
  photo: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
