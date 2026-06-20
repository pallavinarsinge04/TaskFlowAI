const { getAISuggestion } = require("./../services/aiServices");

exports.suggest = async (req, res) => {
  try {
    const { task } = req.body;

    const suggestion = getAISuggestion(task);

    res.json({
      success: true,
      suggestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};