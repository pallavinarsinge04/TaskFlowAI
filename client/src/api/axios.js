import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflowai-api.onrender.com/api",
});

export default API;