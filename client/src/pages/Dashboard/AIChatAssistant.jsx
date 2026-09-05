import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FaRobot,
  FaPaperPlane,
  FaUser,
  FaSpinner,
  FaLightbulb,
} from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";
import "./AIChatAssistant.css";

const AI_API = "http://localhost:5000/api/ai";

const AIChatAssistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your TaskFlowAI assistant. Ask me about your projects, tasks, deadlines, priorities, or team workload.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // =====================================================
  // AUTO SCROLL
  // =====================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessage = async (customMessage = null) => {
    const text =
      customMessage !== null
        ? customMessage
        : message.trim();

    if (!text || loading) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const {
        data: sessionData,
        error: sessionError,
      } = await supabase.auth.getSession();

      if (
        sessionError ||
        !sessionData?.session?.access_token
      ) {
        throw new Error(
          "Please login again."
        );
      }

      const token =
        sessionData.session.access_token;

      const response = await axios.post(
        `${AI_API}/chat`,
        {
          message: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
        }
      );

      const answer =
        response.data?.answer ||
        "I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error) {
      console.error(
        "AI Chat Assistant Error:",
        error
      );

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while contacting the AI assistant.";

      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: `⚠️ ${errorMessage}`,
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  // =====================================================
  // QUICK QUESTIONS
  // =====================================================

  const quickQuestions = [
    "What tasks should I focus on first?",
    "Which tasks are overdue?",
    "Give me a summary of my projects.",
    "Which tasks have high priority?",
  ];

  return (
    <div className="ai-chat-assistant">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="ai-chat-header">
        <div className="ai-chat-title">
          <div className="ai-chat-icon">
            <FaRobot />
          </div>

          <div>
            <h2>AI Chat Assistant</h2>

            <p>
              Ask anything about your
              TaskFlowAI workspace
            </p>
          </div>
        </div>

        <div className="ai-chat-status">
          <span className="ai-status-dot"></span>
          AI Online
        </div>
      </div>

      {/* =================================================
          QUICK QUESTIONS
      ================================================= */}

      <div className="ai-quick-questions">
        <div className="ai-quick-title">
          <FaLightbulb />
          <span>Quick questions</span>
        </div>

        <div className="ai-quick-list">
          {quickQuestions.map(
            (question) => (
              <button
                key={question}
                type="button"
                onClick={() =>
                  sendMessage(question)
                }
                disabled={loading}
              >
                {question}
              </button>
            )
          )}
        </div>
      </div>

      {/* =================================================
          MESSAGES
      ================================================= */}

      <div className="ai-chat-messages">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`ai-message-row ${
              item.role === "user"
                ? "user-message-row"
                : "assistant-message-row"
            }`}
          >
            <div className="ai-message-avatar">
              {item.role === "user" ? (
                <FaUser />
              ) : (
                <FaRobot />
              )}
            </div>

            <div
              className={`ai-message ${
                item.role === "user"
                  ? "user-message"
                  : "assistant-message"
              } ${
                item.error
                  ? "ai-message-error"
                  : ""
              }`}
            >
              <div className="ai-message-label">
                {item.role === "user"
                  ? "You"
                  : "TaskFlowAI"}
              </div>

              <div className="ai-message-content">
                {item.content
                  .split("\n")
                  .map(
                    (line, index) => (
                      <span
                        key={index}
                      >
                        {line}
                        {index <
                          item.content.split(
                            "\n"
                          ).length -
                            1 && (
                          <br />
                        )}
                      </span>
                    )
                  )}
              </div>
            </div>
          </div>
        ))}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="ai-message-row assistant-message-row">
            <div className="ai-message-avatar">
              <FaRobot />
            </div>

            <div className="ai-message assistant-message">
              <div className="ai-message-label">
                TaskFlowAI
              </div>

              <div className="ai-typing">
                <FaSpinner className="ai-spinner" />
                <span>
                  Thinking...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* =================================================
          INPUT
      ================================================= */}

      <div className="ai-chat-input-area">
        <textarea
          value={message}
          onChange={(event) =>
            setMessage(
              event.target.value
            )
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask your AI assistant..."
          rows={2}
          disabled={loading}
        />

        <button
          type="button"
          className="ai-send-button"
          onClick={() =>
            sendMessage()
          }
          disabled={
            loading ||
            !message.trim()
          }
          title="Send message"
        >
          {loading ? (
            <FaSpinner className="ai-spinner" />
          ) : (
            <FaPaperPlane />
          )}
        </button>
      </div>

      <div className="ai-chat-hint">
        Press <strong>Enter</strong> to
        send •{" "}
        <strong>
          Shift + Enter
        </strong>{" "}
        for a new line
      </div>
    </div>
  );
};

export default AIChatAssistant;