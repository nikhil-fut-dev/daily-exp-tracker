const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    category: {
      type: String,
      default: "General",
    },

    dueDate: {
      type: Date,
      required: true,
    },

    frequency: {
      type: String,
      enum: [
        "One Time",
        "Weekly",
        "Monthly",
        "Quarterly",
        "Half Yearly",
        "Yearly",
      ],
      default: "Monthly",
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
    },

    color: {
      type: String,
      default: "#6366F1",
    },

    icon: {
      type: String,
      default: "Receipt",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Bill", billSchema);
