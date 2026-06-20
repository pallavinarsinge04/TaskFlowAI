const { generateResponse } = require("../services/aiService");

exports.analyzeTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const prompt = `
Task Title: ${title}

Description:
${description}

Provide:

1. Priority
2. Estimated Hours
3. Summary
4. Suggested Subtasks
5. Productivity Tips
`;

    const response = await generateResponse(prompt);

    res.json({
      success: true,
      result: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};