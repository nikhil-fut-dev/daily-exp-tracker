const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const { getReport } = require("../controllers/report.controller");

router.get("/", auth, getReport);

module.exports = router;
