import { useState } from "react";
import axios from "axios";
import "./AIAssistant.css";

function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMessage = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        {
          prompt,
          userId: "demo-user",
        }
      );

      const aiMessage = {
        role: "assistant",
        content: res.data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Unable to connect to AI server.",
        },
      ]);
    }

    setPrompt("");
    setLoading(false);
  };

  return (
    <div className="ai-page">

      <div className="ai-header">
        <h1>🤖 AI Assistant</h1>
        <p>Ask anything about your project.</p>
      </div>

      <div className="chat-box">

        {messages.length === 0 && (
          <div className="welcome">
            <h2>Welcome 👋</h2>
            <p>
              Ask AI to create tasks, summarize
              projects or answer programming
              questions.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user"
                ? "message user"
                : "message ai"
            }
          >
            {msg.content}
          </div>
        ))}

      </div>

      <div className="chat-input">

        <textarea
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>

      </div>

    </div>
  );
}

export default AIAssistant;