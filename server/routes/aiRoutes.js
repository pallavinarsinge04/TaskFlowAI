const express = require("express");
const multer = require("multer");
const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// =========================
// Chat
// =========================

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const result = await model.generateContent(message);

    const response = result.response.text();

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================
// Image Analysis
// =========================

router.post(
  "/vision",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image required",
        });
      }

      const prompt =
        req.body.prompt ||
        "Describe this image in detail.";

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
        response: result.response.text(),
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

module.exports = router;