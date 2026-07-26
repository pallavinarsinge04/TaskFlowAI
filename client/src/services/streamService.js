export async function streamResponse(
  message,
  onChunk
) {
  const response = await fetch(
    "http://localhost:5000/api/ai/stream",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    }
  );

  const reader =
    response.body.getReader();

  const decoder =
    new TextDecoder();

  while (true) {

    const {
      value,
      done,
    } = await reader.read();

    if (done) break;

    const text =
      decoder.decode(value);

    const events =
      text.split("\n\n");

    events.forEach((event) => {

      if (
        event.startsWith("data:")
      ) {

        const chunk =
          JSON.parse(
            event.replace(
              "data:",
              ""
            )
          );

        if (chunk !== "[DONE]") {

          onChunk(chunk);

        }

      }

    });

  }
}