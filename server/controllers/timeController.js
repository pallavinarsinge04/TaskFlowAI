const TimeLog = require("../models/TimeLog");

exports.startTimer = async (req, res) => {
  const log = await TimeLog.create({
    taskId: req.body.taskId,
    userId: req.body.userId,
    startTime: new Date(),
  });

  res.json({
    success: true,
    log,
  });
};

exports.stopTimer = async (req, res) => {
  const log = await TimeLog.findById(req.params.id);

  log.endTime = new Date();

  log.duration =
    Math.floor(
      (log.endTime - log.startTime) / 1000
    );

  await log.save();

  res.json({
    success: true,
    log,
  });
};

exports.getLogs = async (req, res) => {
  const logs = await TimeLog.find();

  res.json({
    success: true,
    logs,
  });
};