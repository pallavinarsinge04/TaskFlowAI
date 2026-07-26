import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestedPrompts from "./SuggestedPrompts";

function ChatWindow({
  messages = [],
  loading = false,
  onPromptClick,
}) {
  const bottomRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="chat-window">

      {/* Empty State */}
      {messages.length === 0 && (
        <div className="empty-chat">

          <h1>🤖 TaskFlow AI</h1>

          <p>
            Ask me anything about
            coding, React, Node,
            AI, Projects or Roadmaps.
          </p>

          <SuggestedPrompts
            onSelect={onPromptClick}
          />

        </div>
      )}

      {/* Messages */}

      <div className="messages-container">

        <AnimatePresence>

          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: .3,
              }}
            >
              <MessageBubble
                message={message}
              />
            </motion.div>
          ))}

        </AnimatePresence>

        {loading && (
          <TypingIndicator />
        )}

        <div ref={bottomRef}></div>

      </div>

    </div>
  );
}

export default ChatWindow;