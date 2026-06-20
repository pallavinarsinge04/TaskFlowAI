const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startTime: Date,

    endTime: Date,

    duration: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "TimeLog",
  timeLogSchema
);