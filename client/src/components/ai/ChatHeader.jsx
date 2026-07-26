import {
  FaRobot,
  FaTrash,
  FaMoon,
  FaSun,
  FaPlus,
  FaCog,
} from "react-icons/fa";

function ChatHeader({
  darkMode = true,
  onToggleTheme,
  onNewChat,
  onClearChat,
  onSettings,
}) {
  return (
    <header className="chat-header">

      {/* Left */}
      <div className="header-left">
        <div className="robot-avatar">
          <FaRobot />
        </div>

        <div className="header-text">
          <h2>TaskFlow AI</h2>

          <div className="header-status">
            <span className="online-dot"></span>
            <span>Powered by Gemini • Online</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="header-actions">

        <button
          className="header-btn"
          onClick={onNewChat}
          title="New Chat"
        >
          <FaPlus />
        </button>

        <button
          className="header-btn"
          onClick={onClearChat}
          title="Clear Chat"
        >
          <FaTrash />
        </button>

        <button
          className="header-btn"
          onClick={onToggleTheme}
          title="Toggle Theme"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button
          className="header-btn"
          onClick={onSettings}
          title="Settings"
        >
          <FaCog />
        </button>

      </div>

    </header>
  );
}

export default ChatHeader;