const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Goal = require("../models/Goal");

exports.getCalendarData = async (req, res, next) => {
  try {
    const [income, expense, goals] = await Promise.all([
      Income.find().sort({ date: -1 }),
      Expense.find().sort({ date: -1 }),
      Goal.find().sort({ targetDate: 1 }),
    ]);

    res.status(200).json({
      success: true,
      income,
      expense,
      goals,
    });
  } catch (err) {
    next(err);
  }
};
