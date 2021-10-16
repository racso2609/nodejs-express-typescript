import express = require("express");
const router = express.Router();

import {
  signup,
  login,
  updateProfile,
  verifyEmail,
  forgotPassword,
  getLoggedInUser,
  getProfile,
} from "../controllers/authController";
import { protect } from "../authenticate";

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-email/:emailVerificationCode", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.get("/current-user", getLoggedInUser);

router.route("profile").get(protect, getProfile).put(protect, updateProfile);

const userRoter = router;
export default userRoter;
