import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/ai",
});

export async function sendMessage(
  message,
  userId = "guest"
) {
  const { data } = await API.post(
    "/chat",
    {
      message,
      userId,
    }
  );

  return data.reply;
}

export async function clearChat(
  userId = "guest"
) {
  await API.delete("/clear", {
    data: {
      userId,
    },
  });
}