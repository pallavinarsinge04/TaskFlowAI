const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function generateReply(
  history,
  message
) {
  try {
    const chat = model.startChat({
      history,
    });

    const result = await chat.sendMessage(
      message
    );

    return result.response.text();

  } catch (err) {

    console.error(err);

    throw err;

  }
}

async function analyzeImage(
  image,
  prompt
) {
  const result =
    await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: image.mimetype,
          data: image.buffer.toString(
            "base64"
          ),
        },
      },
    ]);

  return result.response.text();
}

module.exports = {

  generateReply,

  analyzeImage,

};