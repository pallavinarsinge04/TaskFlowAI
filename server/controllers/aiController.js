import model from "../config/gemini.js";
import supabase from "../config/supabase.js";

// Chat
export const chat = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const result = await model.generateContent(message);

    const reply = result.response.text();

    return res.json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("AI Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI service failed",
      error: error.message,
    });
  }
};
// Image Analysis
export const analyzeImage = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Image required",
      });
    }

    const prompt =
      req.body.prompt ||
      "Describe this image.";

    const result =
      await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: req.file.buffer.toString("base64"),
          },
        },
      ]);

    res.json({
      success: true,
      reply: result.response.text(),
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Chat History
export const getHistory = async (req, res) => {

  try {

    const { userId } = req.params;

    const { data, error } =
      await supabase
        .from("ai_chats")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};