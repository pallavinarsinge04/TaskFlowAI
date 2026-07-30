import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const sendMessage = async (message, userId = null) => {
  try {
    const response = await axios.post(`${API}/chat`, {
      message,
      userId,
    });

    console.log("✅ AI Response:", response.data);

    if (response.data.success) {
      return response.data.reply;
    }

    throw new Error(response.data.message || "Unknown AI Error");
  } catch (err) {
    console.error("❌ AI Error:", err);

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);

      throw new Error(
        err.response.data.message || "Backend Server Error"
      );
    }

    if (err.request) {
      throw new Error(
        "Cannot connect to backend. Is the server running on port 5000?"
      );
    }

    throw new Error(err.message);
  }
};

export const getChatHistory = async (userId) => {
  try {
    const response = await axios.get(`${API}/history/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const analyzeImage = async (file, prompt = "Describe this image") => {
  try {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("prompt", prompt);

    const response = await axios.post(
      `${API}/vision`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.reply;
  } catch (err) {
    console.error(err);

    throw new Error(
      err.response?.data?.message || "Image analysis failed"
    );
  }
};