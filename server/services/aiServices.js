import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api/ai",
});

export const sendMessage =
async (message) => {

  const { data } =
    await API.post("/chat", {

      message,

    });

  return data.reply;

};

export const analyzeImage =
async (
  image,
  prompt
) => {

  const formData =
    new FormData();

  formData.append(
    "image",
    image
  );

  formData.append(
    "prompt",
    prompt
  );

  const { data } =
    await API.post(
      "/vision",
      formData
    );

  return data.reply;

};