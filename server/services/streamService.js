const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function streamChat(message, onChunk) {
  try {
    const result = await model.generateContentStream(message);

    for await (const chunk of result.stream) {
      const text = chunk.text();

      if (text) {
        onChunk(text);
      }
    }

    onChunk("[DONE]");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  streamChat,
};