const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      taskId: req.params.taskId,
    });

    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      taskId: req.body.taskId,
      user: req.body.user,
      message: req.body.message,
    });

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};