const Task = require("../models/Task");

exports.getUpcomingTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      dueDate: {
        $ne: null,
      },
    }).sort({
      dueDate: 1,
    });

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};