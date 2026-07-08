const { body } = require("express-validator");

exports.registerValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full Name is required")
    .isLength({ min: 3 })
    .withMessage("Full Name must be at least 3 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid Email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];