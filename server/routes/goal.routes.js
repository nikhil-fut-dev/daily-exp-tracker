const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  addSaving,
} = require("../controllers/goal.controller");

// Create Goal
router.post("/", auth, addGoal);

// Get All Goals
router.get("/", auth, getGoals);

// Update Goal
router.put("/:id", auth, updateGoal);

// Delete Goal
router.delete("/:id", auth, deleteGoal);

// Add Saving
router.patch("/:id/add-saving", auth, addSaving);

module.exports = router;
