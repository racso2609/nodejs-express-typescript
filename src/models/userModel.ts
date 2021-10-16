import mongoose = require("mongoose");
import bcrypt = require("bcrypt");
import crypto = require("crypto");

const Schema = mongoose.Schema;
interface userInterface {
  email: string;
  password: string;
  role: string;
  emailVerified: Boolean;
  emailVerificationCode?: string;
  passwordResetToken?: string ;
  passwordResetExpires?: string;
  phone?: string;
  firstName: string;
  lastName: string;
}
const UserModel = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: "String",
    default: "user",
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationCode: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

UserModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
UserModel.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserModel.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", UserModel);
export { User, userInterface };
