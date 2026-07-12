const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "bill_due_today",
        "bill_due_tomorrow",
        "bill_overdue",
        "goal_completed",
        "goal_deadline",
        "budget_alert",
        "budget_exceeded",
        "expense_large",
        "income_added",
        "system",
      ],
    },

    module: {
      type: String,
      required: true,
      enum: ["Bills", "Goals", "Budget", "Expense", "Income", "System"],
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    actionUrl: {
      type: String,
      default: "",
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Notification", notificationSchema);
