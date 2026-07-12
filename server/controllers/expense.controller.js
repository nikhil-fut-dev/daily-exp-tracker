const Expense = require("../models/Expense");

const { checkExpenseNotification } = require("../utils/notificationHelper");

// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, paymentMethod, note, date } = req.body;

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      paymentMethod,
      note,
      date,
    });

    await checkExpenseNotification({
      user: req.user.id,
      expense,
    });

    res.status(201).json({
      success: true,
      message: "Expense Added Successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Expenses
exports.getAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    await checkExpenseNotification({
      user: req.user.id,
      expense,
    });

    res.status(200).json({
      success: true,
      message: "Expense Updated Successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
