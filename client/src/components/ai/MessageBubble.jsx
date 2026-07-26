import {
  FaRobot,
  FaUser,
  FaCopy,
  FaRedo,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";

import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { motion } from "framer-motion";
import CodeBlock from "./CodeBlock";
import TypingAnimation from "./TypingAnimation";
function MessageBubble({
  message,
  onRegenerate,
}) {
  const isUser = message.sender === "user";

  const time = new Date(
    message.createdAt || Date.now()
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      className={`message-wrapper ${
        isUser ? "user-message" : "ai-message"
      }`}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .3,
      }}
    >
      {/* Avatar */}

      <div className="chat-avatar">
        {isUser ? (
          <FaUser />
        ) : (
          <FaRobot />
        )}
      </div>

      {/* Message */}

      <div className="message-content">

        <div
          className={`bubble ${
            isUser
              ? "user-bubble"
              : "assistant-bubble"
          }`}
        >
          {isUser ? (
            <p>{message.text}</p>
          ) : (
           <ReactMarkdown>
  <TypingAnimation
    text={message.text}
    speed={12}
  />
</ReactMarkdown>
          )}
        </div>

        {/* Footer */}

        <div className="message-footer">

          <span>{time}</span>

          {!isUser && (
            <>

              <CopyToClipboard
                text={message.text}
                onCopy={() =>
                  toast.success(
                    "Copied"
                  )
                }
              >
                <button>
                  <FaCopy />
                </button>
              </CopyToClipboard>

              <button>
                <FaThumbsUp />
              </button>

              <button>
                <FaThumbsDown />
              </button>

              <button
                onClick={() =>
                  onRegenerate?.()
                }
              >
                <FaRedo />
              </button>

            </>
          )}

        </div>

      </div>
    </motion.div>
  );
}

export default MessageBubble;