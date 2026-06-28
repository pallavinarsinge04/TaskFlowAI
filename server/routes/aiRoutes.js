import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/generate-task", async (req, res) => {

  const { prompt } = req.body;

  try {

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a task management AI.

Break this into structured tasks:
${prompt}

Return JSON:
{
 title: "",
 description: "",
 priority: "",
 subtasks: []
}
                `
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          key: process.env.GEMINI_API_KEY
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

export default router;