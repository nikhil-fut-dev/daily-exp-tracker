const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const upload = require("../config/multer");
const express = require("express");

const router = express.Router();

const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

const {
  register,
  login,
  profile,
  updateProfile,
  changePassword,
  sendOtp,
  verifyOtp,
  resetPassword,
} = require("../controllers/auth.controller");

router.post("/register", registerValidator, validate, register);

router.post("/login", loginValidator, validate, login);

router.get("/profile", auth, profile);

router.put("/profile", auth, upload.single("avatar"), updateProfile);

router.put("/change-password", auth, changePassword);

router.post("/forgot-password", sendOtp);

router.post("/verify-otp", verifyOtp);

router.put("/reset-password", resetPassword);

module.exports = router;
