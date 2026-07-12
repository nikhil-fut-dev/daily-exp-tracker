const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  getBills,
  createBill,
  updateBill,
  deleteBill,
} = require("../controllers/bill.controller");

// Get All Bills
router.get("/", auth, getBills);

// Create Bill
router.post("/", auth, createBill);

// Update Bill
router.put("/:id", auth, updateBill);

// Delete Bill
router.delete("/:id", auth, deleteBill);

module.exports = router;
