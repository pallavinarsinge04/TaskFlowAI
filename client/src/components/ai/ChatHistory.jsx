import {
  FaRobot,
  FaTrash,
  FaEdit,
  FaThumbtack,
  FaRegThumbtack,
  FaSearch,
} from "react-icons/fa";
import { useMemo, useState } from "react";

function ChatHistory({
  chats = [],
  activeChatId,
  onSelect,
  onDelete,
  onRename,
  onPin,
}) {
  const [search, setSearch] = useState("");

  const filteredChats = useMemo(() => {
    const value = search.toLowerCase().trim();

    return chats
      .filter((chat) =>
        chat.title.toLowerCase().includes(value)
      )
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;

        return (
          new Date(b.updatedAt) -
          new Date(a.updatedAt)
        );
      });
  }, [search, chats]);

  const renameChat = (chat) => {
    const title = prompt(
      "Rename conversation",
      chat.title
    );

    if (!title) return;

    onRename(chat.id, title);
  };

  return (
    <div className="chat-history">

      <div className="history-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="history-list">

        {filteredChats.length === 0 ? (
          <div className="empty-chat-history">
            No conversations found.
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`history-card ${
                activeChatId === chat.id
                  ? "active-history"
                  : ""
              }`}
              onClick={() => onSelect(chat.id)}
            >

              <div className="history-main">

                <FaRobot className="history-avatar" />

                <div className="history-info">

                  <h4>{chat.title}</h4>

                  <small>
                    {new Date(
                      chat.updatedAt
                    ).toLocaleString()}
                  </small>

                </div>

              </div>

              <div className="history-buttons">

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPin(chat.id);
                  }}
                >
                  {chat.pinned ? (
                    <FaThumbtack />
                  ) : (
                    <FaRegThumbtack />
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    renameChat(chat);
                  }}
                >
                  <FaEdit />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(chat.id);
                  }}
                >
                  <FaTrash />
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default ChatHistory;