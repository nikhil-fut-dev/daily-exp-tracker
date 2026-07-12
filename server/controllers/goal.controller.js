const Goal = require("../models/Goal");

// ===============================
// Add Goal
// ===============================
exports.addGoal = async (req, res) => {
  try {
    const goal = await Goal.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Goal Created Successfully",
      goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Goals
// ===============================
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    const data = goals.map((goal) => {
      const percentage =
        goal.targetAmount > 0
          ? Math.min(
              Math.round((goal.savedAmount / goal.targetAmount) * 100),
              100,
            )
          : 0;

      const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0);

      return {
        ...goal.toObject(),
        percentage,
        remaining,
      };
    });

    res.status(200).json({
      success: true,
      count: data.length,
      goals: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Goal
// ===============================
exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
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

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Goal Updated Successfully",
      goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Goal
// ===============================
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Goal Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Add Saving
// ===============================
exports.addSaving = async (req, res) => {
  try {
    const { amount } = req.body;

    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    goal.savedAmount += Number(amount);

    if (goal.savedAmount >= goal.targetAmount) {
      goal.savedAmount = goal.targetAmount;
      goal.status = "Completed";
    }

    await goal.save();

    res.status(200).json({
      success: true,
      message: "Saving Added Successfully",
      goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
