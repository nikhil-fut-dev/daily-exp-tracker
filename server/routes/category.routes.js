const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.post("/", auth, addCategory);

router.get("/", auth, getCategories);

router.put("/:id", auth, updateCategory);

router.delete("/:id", auth, deleteCategory);

module.exports = router;
