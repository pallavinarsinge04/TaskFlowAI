import "./AIAssistant.css";

function AIAssistant() {
  return (
    <div className="page-container">
      <h1>🤖 AI Assistant</h1>

      <div className="page-card">

        <div className="chat-box">
          <div className="bot-msg">
            Hello 👋 How can I help you today?
          </div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask AI anything..."
          />

          <button>Send</button>
        </div>

      </div>
    </div>
  );
}

export default AIAssistant;