import "./AIAssistant.css";
import { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";

function AIAssistant() {

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "👋 Hi! I am your AI Assistant. Ask me to create tasks, plans or project ideas."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!input) return;

    const userMessage = { role: "user", text: input };

    setMessages(prev => [...prev, userMessage]);

    setLoading(true);

    try {

      const res = await axios.post("http://localhost:5000/api/ai/generate-task", {
        prompt: input
      });

      const aiResponse = {
        role: "ai",
        text: JSON.stringify(res.data, null, 2)
      };

      setMessages(prev => [...prev, aiResponse]);

    } catch (err) {

      setMessages(prev => [
        ...prev,
        { role: "ai", text: "⚠️ Error generating response" }
      ]);

    }

    setLoading(false);
    setInput("");
  };

  return (

    <div className="ai-container">

      {/* HEADER */}
      <div className="ai-header">

        <h1>🤖 AI Assistant</h1>
        <p>Your smart productivity co-pilot</p>

      </div>

      {/* CHAT BOX */}
      <div className="chat-box">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`message ${msg.role}`}
          >

            {msg.text}

          </div>

        ))}

        {loading && (
          <div className="message ai">
            Thinking...
          </div>
        )}

      </div>

      {/* INPUT BOX */}
      <div className="input-box">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI to create tasks, plans, ideas..."
        />

        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>

      </div>

    </div>

  );

}

export default AIAssistant;