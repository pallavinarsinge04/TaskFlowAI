const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    filename: String,

    originalname: String,

    path: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Attachment",
  attachmentSchema
);