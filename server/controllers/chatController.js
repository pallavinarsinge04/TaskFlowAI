const chatDB = require("../services/supabaseService");

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages =
      await chatDB.loadMessages(userId);

    res.json(messages);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

exports.clearMessages = async (req, res) => {
  try {

    const { userId } = req.params;

    await chatDB.deleteMessages(userId);

    res.json({
      success: true,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};