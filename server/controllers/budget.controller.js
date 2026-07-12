const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const { checkBudgetNotification } = require("../utils/notificationHelper");

// Add Budget
exports.addBudget = async (req, res) => {
  try {
    const { category, limit, month, year } = req.body;

    const budget = await Budget.create({
      user: req.user.id,
      category,
      limit,
      month,
      year,
    });

    res.status(201).json({
      success: true,
      message: "Budget Created Successfully",
      budget,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Budget already exists for this category and month.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Budgets
exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user.id,
    }).sort({
      year: -1,
      month: -1,
      category: 1,
    });

    const data = await Promise.all(
      budgets.map(async (budget) => {
        const expenses = await Expense.find({
          user: req.user.id,
          category: budget.category,
        });

        const spent = expenses
          .filter((expense) => {
            const date = new Date(expense.date);

            return (
              date.getMonth() + 1 === budget.month &&
              date.getFullYear() === budget.year
            );
          })
          .reduce((sum, expense) => sum + expense.amount, 0);

        const remaining = budget.limit - spent;

        const percentage =
          budget.limit > 0
            ? Math.min(Math.round((spent / budget.limit) * 100), 100)
            : 0;

        let status = "safe";

        if (percentage >= 100) {
          status = "danger";
        } else if (percentage >= 80) {
          status = "warning";
        }

        await checkBudgetNotification({
          user: req.user.id,
          budget,
          percentage,
        });

        return {
          ...budget.toObject(),
          spent,
          remaining,
          percentage,
          status,
        };
      }),
    );

    res.status(200).json({
      success: true,
      count: data.length,
      budgets: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Budget
exports.updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
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

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Budget Updated Successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Budget
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Budget Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
