import { useState } from "react";
import { sendMessage } from "./../../services/chatService";

function AIAssistant() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {

    if (!input.trim()) return;

    const reply = await sendMessage(input);

    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: input,
      },
      {
        sender: "ai",
        text: reply,
      },
    ]);

    setInput("");
  };

  return (
    <div>
      {/* UI */}
    </div>
  );
}

export default AIAssistant;