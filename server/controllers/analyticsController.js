const Task = require("../models/Task");

exports.getAnalytics = async (req, res) => {
  try {
    const total = await Task.countDocuments();

    const completed = await Task.countDocuments({
      status: "Done",
    });

    const pending = await Task.countDocuments({
      status: "Todo",
    });

    const progress = await Task.countDocuments({
      status: "In Progress",
    });

    const completionRate =
      total === 0
        ? 0
        : ((completed / total) * 100).toFixed(2);

    res.json({
      success: true,
      total,
      completed,
      pending,
      progress,
      completionRate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};