const API_URL = "http://localhost:5000/api/ai";

export async function sendMessage(message, userId = "demo-user") {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: message,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();

    return data.response;
  } catch (error) {
    console.error("AI Error:", error);
    return "Unable to connect to AI server.";
  }
}