import { useState } from "react";
import MessageBubble from "../components/AIAssistant/MessageBubble";
import MessageInput from "../components/AIAssistant/MessageInput";
import TypingIndicator from "../components/AIAssistant/TypingIndicator";
import "./AIAssistant.css";

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "👋 Hi Pallavi! I'm TaskFlow AI. How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);
const response = await sendMessage(
  message,
  [...messages, userMessage]
);
  return (
    <div className="ai-page">
      <div className="chat-card">

        <div className="chat-header">
          <div>
            <h1>🤖 TaskFlow AI</h1>
            <p>Your Smart Productivity Assistant</p>
          </div>

          <span className="online-badge">
            ● Online
          </span>
        </div>

        <div className="chat-body">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {loading && <TypingIndicator />}
        </div>

        <MessageInput
  loading={loading}
  onSend={handleSend}
  onFileUpload={(file) => {
    console.log("Uploaded:", file);
  }}
/>
      </div>
    </div>
  );
}

export default AIAssistant;