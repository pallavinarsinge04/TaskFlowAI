const {
  streamChat,
} = require("../services/streamService");

exports.stream = async (req, res) => {
  try {
    const { message } = req.body;

    res.setHeader(
      "Content-Type",
      "text/event-stream"
    );

    res.setHeader(
      "Cache-Control",
      "no-cache"
    );

    res.setHeader(
      "Connection",
      "keep-alive"
    );

    res.flushHeaders();

    await streamChat(message, (chunk) => {
      res.write(
        `data: ${JSON.stringify(chunk)}\n\n`
      );
    });

    res.end();

  } catch (err) {

    res.write(
      `data:${JSON.stringify(
        "Error occurred."
      )}\n\n`
    );

    res.end();

  }
};