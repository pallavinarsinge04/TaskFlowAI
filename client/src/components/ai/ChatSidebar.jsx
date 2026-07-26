import {
  FaPlus,
  FaRobot,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

function ChatSidebar({
  chats = [],
  currentChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onRenameChat,
}) {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <FaRobot className="logo-icon" />
        <div>
          <h2>TaskFlow AI</h2>
          <p>Smart Assistant</p>
        </div>
      </div>

      {/* New Chat Button */}
      <button
        className="new-chat-btn"
        onClick={onNewChat}
      >
        <FaPlus />
        <span>New Chat</span>
      </button>

      {/* Chat History */}
      <div className="history-section">

        <h4>Recent Chats</h4>

        {chats.length === 0 ? (
          <div className="empty-history">
            No conversations yet
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`history-item ${
                currentChatId === chat.id
                  ? "active-chat"
                  : ""
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="history-left">
                <FaRobot className="history-icon" />

                <span className="history-title">
                  {chat.title}
                </span>
              </div>

              <div
                className="history-actions"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="icon-btn"
                  title="Rename"
                  onClick={() =>
                    onRenameChat(chat.id)
                  }
                >
                  <FaEdit />
                </button>

                <button
                  className="icon-btn delete-btn"
                  title="Delete"
                  onClick={() =>
                    onDeleteChat(chat.id)
                  }
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="status-dot"></div>
        <span>Gemini AI Connected</span>
      </div>

    </aside>
  );
}

export default ChatSidebar;