import { FaRobot } from "react-icons/fa";

function TypingIndicator() {
  return (
    <div className="message assistant">
      <div className="avatar">
        <FaRobot />
      </div>

      <div className="typing-container">
        <div className="typing-header">
          <span className="typing-name">
            TaskFlow AI
          </span>

          <span className="typing-status">
            Gemini is thinking...
          </span>
        </div>

        <div className="typing-bubble">

          <span></span>
          <span></span>
          <span></span>

        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;