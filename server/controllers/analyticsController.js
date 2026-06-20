const Task = require("../models/Task");

exports.getAnalytics = async (req, res) => {
  try {

    const total = await Task.countDocuments();

    const todo = await Task.countDocuments({
      status: "Todo",
    });

    const progress = await Task.countDocuments({
      status: "In Progress",
    });

    const completed = await Task.countDocuments({
      status: "Done",
    });

    const high = await Task.countDocuments({
      priority: "High",
    });

    const medium = await Task.countDocuments({
      priority: "Medium",
    });

    const low = await Task.countDocuments({
      priority: "Low",
    });

    res.json({
      success: true,

      analytics: {
        total,
        todo,
        progress,
        completed,
        high,
        medium,
        low,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};