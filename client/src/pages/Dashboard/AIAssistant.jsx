import { useState } from "react";
import axios from "axios";

import {
  FaBrain,
  FaPaperPlane,
  FaUser,
  FaSpinner,
  FaRobot,
} from "react-icons/fa";

import { supabase } from "../../supabase/supabaseClient";

import "./AIChatAssistant.css";

const AI_API =
  "http://localhost:5000/api/ai";

function AIChatAssistant() {
  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        role: "assistant",
        content:
          "Hi! 👋 I'm your TaskFlowAI assistant. Ask me anything about your projects, tasks, deadlines, or productivity.",
      },
    ]);

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async (
    event
  ) => {
    event?.preventDefault();

    const trimmedMessage =
      message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    try {
      setLoading(true);

      setMessages((previous) => [
        ...previous,
        {
          role: "user",
          content: trimmedMessage,
        },
      ]);

      setMessage("");

      const {
        data: sessionData,
      } =
        await supabase.auth.getSession();

      const token =
        sessionData?.session?.access_token;

      if (!token) {
        throw new Error(
          "Please login again."
        );
      }

      const response =
        await axios.post(
          `${AI_API}/chat`,
          {
            message: trimmedMessage,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const answer =
        response.data?.answer ||
        "I couldn't generate an answer.";

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error) {
      console.error(
        "AI chat error:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            error.response?.data
              ?.message ||
            error.message ||
            "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "What tasks are overdue?",
    "What should I work on first?",
    "Give me a project summary.",
    "Which tasks are high priority?",
  ];

  const useQuickQuestion = (
    question
  ) => {
    setMessage(question);
  };

  return (
    <section className="ai-chat-assistant">
      <div className="ai-chat-header">
        <div className="ai-chat-title">
          <div className="ai-chat-icon">
            <FaBrain />
          </div>

          <div>
            <h2>
              AI Project Assistant
            </h2>

            <p>
              Ask questions about your
              projects and tasks.
            </p>
          </div>
        </div>

        <div className="ai-status">
          <span />
          AI Online
        </div>
      </div>

      <div className="ai-chat-body">
        <div className="ai-messages">
          {messages.map(
            (item, index) => (
              <div
                key={index}
                className={`ai-message ${
                  item.role
                }`}
              >
                <div className="ai-message-avatar">
                  {item.role ===
                  "assistant" ? (
                    <FaRobot />
                  ) : (
                    <FaUser />
                  )}
                </div>

                <div className="ai-message-content">
                  {item.content
                    .split("\n")
                    .map(
                      (
                        line,
                        lineIndex
                      ) => (
                        <p
                          key={
                            lineIndex
                          }
                        >
                          {line ||
                            "\u00A0"}
                        </p>
                      )
                    )}
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="ai-message assistant">
              <div className="ai-message-avatar">
                <FaRobot />
              </div>

              <div className="ai-message-content ai-thinking">
                <FaSpinner className="spin" />
                Thinking...
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="quick-questions">
            <span>
              Try asking:
            </span>

            <div>
              {quickQuestions.map(
                (question) => (
                  <button
                    key={question}
                    onClick={() =>
                      useQuickQuestion(
                        question
                      )
                    }
                  >
                    {question}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <form
        className="ai-chat-input"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          value={message}
          onChange={(event) =>
            setMessage(
              event.target.value
            )
          }
          placeholder="Ask about your projects or tasks..."
          disabled={loading}
        />

        <button
          type="submit"
          disabled={
            loading ||
            !message.trim()
          }
        >
          {loading ? (
            <FaSpinner className="spin" />
          ) : (
            <FaPaperPlane />
          )}
        </button>
      </form>
    </section>
  );
}

export default AIChatAssistant;