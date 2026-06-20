const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
  const comments = await Comment.find({
    taskId: req.params.taskId,
  });

  res.json({
    success: true,
    comments,
  });
};

exports.addComment = async (req, res) => {
  const comment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    comment,
  });
};