const Income = require("../models/Income");

// Add Income
exports.addIncome = async (req, res) => {
  try {
    const { title, amount, category, note, date } = req.body;

    const income = await Income.create({
      user: req.user.id,
      title,
      amount,
      category,
      note,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Income Added Successfully",
      income,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Income
exports.getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: incomes.length,
      incomes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Income
exports.updateIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income updated successfully",
      income,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Income
exports.deleteIncome = async (req, res) => {
  try {

    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};