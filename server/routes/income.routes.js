const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  addIncome,
  getAllIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/income.controller");

router.post("/", auth, addIncome);

router.get("/", auth, getAllIncome);

router.put("/:id", auth, updateIncome);

router.delete("/:id", auth, deleteIncome);

module.exports = router;