const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },

    icon: {
      type: String,
      default: "Folder",
    },

    color: {
      type: String,
      default: "#6366F1",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate category for same user & type
categorySchema.index(
  {
    user: 1,
    name: 1,
    type: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Category", categorySchema);
