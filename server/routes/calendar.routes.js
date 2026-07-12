const express = require("express");

const router = express.Router();

const {
  getCalendarData,
} = require("../controllers/calendar.controller");

router.get("/", getCalendarData);

module.exports = router;