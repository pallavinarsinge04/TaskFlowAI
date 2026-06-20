const Attachment = require("../models/Attachment");

exports.uploadFile = async (req, res) => {
  const file = await Attachment.create({
    taskId: req.body.taskId,
    filename: req.file.filename,
    originalname: req.file.originalname,
    path: req.file.path,
  });

  res.json({
    success: true,
    file,
  });
};