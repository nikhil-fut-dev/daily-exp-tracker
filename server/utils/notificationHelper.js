const {
  createNotificationIfNotExists,
} = require("../services/notification.service");

/**
 * Budget Notification
 */
const checkBudgetNotification = async ({ user, budget, percentage }) => {
  if (percentage >= 100) {
    return await createNotificationIfNotExists({
      user,
      type: "budget_exceeded",
      module: "Budget",
      title: `${budget.category} Budget`,
      message: `${budget.category} budget exceeded.`,
      priority: "high",
      metadata: {
        budgetId: budget._id,
      },
    });
  }

  if (percentage >= 90) {
    return await createNotificationIfNotExists({
      user,
      type: "budget_alert",
      module: "Budget",
      title: `${budget.category} Budget`,
      message: `${budget.category} budget is ${percentage}% used.`,
      priority: "medium",
      metadata: {
        budgetId: budget._id,
      },
    });
  }

  return null;
};

/**
 * Goal Notification
 */
const checkGoalNotification = async ({ user, goal }) => {
  if (goal.savedAmount >= goal.targetAmount) {
    return await createNotificationIfNotExists({
      user,
      type: "goal_completed",
      module: "Goals",
      title: goal.title,
      message: `${goal.title} completed successfully.`,
      priority: "high",
      metadata: {
        goalId: goal._id,
      },
    });
  }

  return null;
};

/**
 * Large Expense Notification
 */
const checkExpenseNotification = async ({ user, expense }) => {
  const amount = Number(expense.amount);

  console.log("Expense Amount:", amount);

  if (amount >= 50000) {
    console.log("Creating Large Expense Notification...");

    return await createNotificationIfNotExists({
      user,
      type: "expense_large",
      module: "Expense",
      title: "Large Expense",
      message: `₹${amount.toLocaleString()} expense added.`,
      priority: "high",
      metadata: {
        expenseId: expense._id.toString(),
      },
    });
  }

  return null;
};

module.exports = {
  checkBudgetNotification,
  checkGoalNotification,
  checkExpenseNotification,
};
