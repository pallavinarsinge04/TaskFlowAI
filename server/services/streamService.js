const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model =
genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function streamReply(
  prompt,
  onChunk
) {

  const result =
    await model.generateContentStream(
      prompt
    );

  for await (
    const chunk of result.stream
  ) {

    onChunk(chunk.text());

  }

}

module.exports = {
  streamReply,
};