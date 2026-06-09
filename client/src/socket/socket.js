import { io } from "socket.io-client";

const socket = io("https://taskflowai-api.onrender.com");

export default socket;