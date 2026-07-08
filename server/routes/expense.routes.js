const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  addExpense,
  getAllExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense.controller");

router.post("/", auth, addExpense);

router.get("/", auth, getAllExpense);

router.put("/:id", auth, updateExpense);

router.delete("/:id", auth, deleteExpense);

module.exports = router;