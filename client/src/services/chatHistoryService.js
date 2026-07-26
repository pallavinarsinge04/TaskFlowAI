import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api/chat",
});

export async function loadHistory(userId) {

  const { data } =
    await API.get(`/${userId}`);

  return data;
}

export async function clearHistory(userId) {

  await API.delete(`/${userId}`);

}