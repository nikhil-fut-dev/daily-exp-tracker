const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const incomes = await Income.find({ user: userId }).sort({ date: -1 });

    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

    // Summary
    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    const totalSavings = totalBalance;

    // Recent Transactions
    const allTransactions = [
      ...incomes.map((item) => ({
        id: item._id,
        title: item.title,
        amount: item.amount,
        type: "income",
        category: item.category,
        date: item.date,
      })),

      ...expenses.map((item) => ({
        id: item._id,
        title: item.title,
        amount: item.amount,
        type: "expense",
        category: item.category,
        date: item.date,
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalTransactions = allTransactions.length;

    const totalPages = Math.ceil(totalTransactions / limit);

    const recentTransactions = allTransactions.slice(
      (page - 1) * limit,
      page * limit,
    );

    const monthlyChart = [];

    for (let i = 0; i < 12; i++) {
      monthlyChart.push({
        month: new Date(2026, i).toLocaleString("default", {
          month: "short",
        }),
        income: 0,
        expense: 0,
      });
    }

    incomes.forEach((item) => {
      const month = new Date(item.date).getMonth();
      monthlyChart[month].income += item.amount;
    });

    expenses.forEach((item) => {
      const month = new Date(item.date).getMonth();
      monthlyChart[month].expense += item.amount;
    });

    const expenseCategories = {};

    expenses.forEach((expense) => {
      if (!expenseCategories[expense.category]) {
        expenseCategories[expense.category] = 0;
      }

      expenseCategories[expense.category] += expense.amount;
    });

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalIncome,
          totalExpense,
          totalBalance,
          totalSavings,
        },

        recentTransactions,

        monthlyChart,

        expenseCategories,

        incomeCount: incomes.length,

        expenseCount: expenses.length,

        pagination: {
          page,
          limit,
          totalPages,
          totalTransactions,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
