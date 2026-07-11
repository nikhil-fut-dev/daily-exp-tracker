const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const incomes = await Income.find({ user: userId });
    const expenses = await Expense.find({ user: userId });

    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

    const savings = totalIncome - totalExpense;

    const transactions = incomes.length + expenses.length;

    // Category Wise Expense

    const categoryMap = {};

    expenses.forEach((expense) => {
      if (!categoryMap[expense.category]) {
        categoryMap[expense.category] = 0;
      }

      categoryMap[expense.category] += expense.amount;
    });

    const categoryData = Object.keys(categoryMap).map((category) => ({
      category,
      amount: categoryMap[category],
    }));

    // Monthly Analytics

    const monthlyMap = {};

    for (let i = 0; i < 12; i++) {
      monthlyMap[i] = {
        month: new Date(2026, i).toLocaleString("default", {
          month: "short",
        }),
        income: 0,
        expense: 0,
      };
    }

    // Income
    incomes.forEach((income) => {
      const month = new Date(income.date).getMonth();
      monthlyMap[month].income += income.amount;
    });

    // Expense
    expenses.forEach((expense) => {
      const month = new Date(expense.date).getMonth();
      monthlyMap[month].expense += expense.amount;
    });

    const monthlyData = Object.values(monthlyMap);

    res.status(200).json({
      success: true,
      totalIncome,
      totalExpense,
      savings,
      transactions,
      categoryData,
      monthlyData,
      incomes,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
