import { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
  FaRobot,
  FaPaperPlane,
  FaFolderOpen,
  FaTasks,
  FaUsers,
  FaChartLine,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaClipboardList,
  FaProjectDiagram,
  FaLightbulb,
  FaChartPie,
  FaSyncAlt,
  FaBug,
  FaEnvelope,
  FaComments,
  FaMicrophone,
  FaImage,
} from "react-icons/fa";

import "./AIAssistant.css";

const API = "http://localhost:5000/api/ai/chat";

function AIAssistant() {

  // ===============================
  // Chat States
  // ===============================

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Welcome to TaskFlow AI Copilot.\n\nI can help you create projects, generate tasks, analyze risks, prepare reports, plan sprints and much more.",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // ===============================
  // Dashboard Stats
  // ===============================

  const [stats] = useState({

    totalProjects: 12,

    totalTasks: 84,

    completedTasks: 67,

    teamMembers: 8,

    activeProjects: 5,

    highRisk: 3,

    dueToday: 6,

    productivity: 82,

  });

  // ===============================
  // AI Suggestions
  // ===============================

  const [suggestions] = useState([

    "Generate Sprint Plan",

    "Create Login Module Tasks",

    "Analyze Project Risks",

    "Generate Weekly Report",

    "Summarize Today's Progress",

    "Suggest Project Improvements",

  ]);

  // ===============================
  // Quick Actions
  // ===============================

  const quickActions = [

    {
      icon: <FaProjectDiagram />,
      title: "Create Project",
      prompt:
        "Create a complete software project plan.",
    },

    {
      icon: <FaClipboardList />,
      title: "Generate Tasks",
      prompt:
        "Generate detailed development tasks.",
    },

    {
      icon: <FaCalendarAlt />,
      title: "Sprint Planner",
      prompt:
        "Create a 4-week sprint plan.",
    },

    {
      icon: <FaUsers />,
      title: "Assign Team",
      prompt:
        "Assign team members based on skills.",
    },

    {
      icon: <FaExclamationTriangle />,
      title: "Risk Analysis",
      prompt:
        "Analyze project risks.",
    },

    {
      icon: <FaChartPie />,
      title: "Weekly Report",
      prompt:
        "Generate weekly project report.",
    },

    {
      icon: <FaEnvelope />,
      title: "Email Team",
      prompt:
        "Write a professional email to the team.",
    },

    {
      icon: <FaComments />,
      title: "Meeting Summary",
      prompt:
        "Generate meeting minutes.",
    },

    {
      icon: <FaBug />,
      title: "Find Issues",
      prompt:
        "Detect possible project blockers.",
    },

    {
      icon: <FaLightbulb />,
      title: "AI Suggestions",
      prompt:
        "Suggest improvements for my project.",
    },

  ];

  // ===============================
  // Auto Scroll
  // ===============================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({

      behavior: "smooth",

    });

  }, [messages]);

  // ===============================
  // Send Prompt
  // ===============================

  const sendPrompt = async (text) => {

    if (!text.trim()) return;

    const userMessage = {

      role: "user",

      content: text,

    };

    setMessages((prev) => [

      ...prev,

      userMessage,

    ]);

    setLoading(true);

    try {

      const res = await axios.post(API, {

        message: text,

      });

      setMessages((prev) => [

        ...prev,

        {

          role: "assistant",

          content: res.data.reply,

        },

      ]);

    } catch (err) {

      setMessages((prev) => [

        ...prev,

        {

          role: "assistant",

          content:
            "❌ Unable to connect to AI service.",

        },

      ]);

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  // ===============================
  // Send Chat Message
  // ===============================

  const handleSend = () => {

    sendPrompt(input);

    setInput("");

  };

  // ===============================
  // Press Enter
  // ===============================

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      handleSend();

    }

  };

   return (
    <div className="ai-page">

      {/* ================= HEADER ================= */}

      <div className="ai-header">

        <div>

          <h1>
            <FaRobot />
            {" "}TaskFlow AI Copilot
          </h1>

          <p>
            AI-powered Project Management Assistant
          </p>

        </div>

        <div className="ai-status">

          <span className="status-dot"></span>

          AI Online

        </div>

      </div>

      {/* ================= DASHBOARD ================= */}

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <FaFolderOpen className="card-icon"/>

          <h2>{stats.totalProjects}</h2>

          <p>Total Projects</p>

        </div>

        <div className="dashboard-card">

          <FaTasks className="card-icon"/>

          <h2>{stats.totalTasks}</h2>

          <p>Total Tasks</p>

        </div>

        <div className="dashboard-card">

          <FaUsers className="card-icon"/>

          <h2>{stats.teamMembers}</h2>

          <p>Team Members</p>

        </div>

        <div className="dashboard-card">

          <FaChartLine className="card-icon"/>

          <h2>{stats.productivity}%</h2>

          <p>Productivity</p>

        </div>

        <div className="dashboard-card warning">

          <FaExclamationTriangle className="card-icon"/>

          <h2>{stats.highRisk}</h2>

          <p>High Risk Projects</p>

        </div>

        <div className="dashboard-card success">

          <FaTasks className="card-icon"/>

          <h2>{stats.completedTasks}</h2>

          <p>Completed Tasks</p>

        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="section">

        <div className="section-title">

          <FaLightbulb />

          <h2>Quick AI Actions</h2>

        </div>

        <div className="quick-grid">

          {quickActions.map((action, index) => (

            <button

              key={index}

              className="quick-card"

              onClick={() =>
                sendPrompt(action.prompt)
              }

            >

              <div className="quick-icon">

                {action.icon}

              </div>

              <span>

                {action.title}

              </span>

            </button>

          ))}

        </div>

      </div>

      {/* ================= AI SUGGESTIONS ================= */}

      <div className="section">

        <div className="section-title">

          <FaSyncAlt />

          <h2>Today's AI Suggestions</h2>

        </div>

        <div className="suggestion-list">

          {suggestions.map((item, index) => (

            <div

              key={index}

              className="suggestion-card"

              onClick={() =>
                sendPrompt(item)
              }

            >

              <FaRobot />

              <span>{item}</span>

            </div>

          ))}

        </div>

      </div>

           {/* ================= PROJECT INSIGHTS ================= */}

      <div className="section">

        <div className="section-title">

          <FaChartPie />

          <h2>Project Insights</h2>

        </div>

        <div className="insight-grid">

          <div className="insight-card">

            <h3>TaskFlowAI</h3>

            <p>Overall Progress</p>

            <div className="progress">

              <div
                className="progress-fill"
                style={{ width: "82%" }}
              ></div>

            </div>

            <span>82% Completed</span>

          </div>

          <div className="insight-card">

            <h3>Website Redesign</h3>

            <p>Overall Progress</p>

            <div className="progress">

              <div
                className="progress-fill green"
                style={{ width: "63%" }}
              ></div>

            </div>

            <span>63% Completed</span>

          </div>

          <div className="insight-card">

            <h3>Mobile App</h3>

            <p>Overall Progress</p>

            <div className="progress">

              <div
                className="progress-fill orange"
                style={{ width: "48%" }}
              ></div>

            </div>

            <span>48% Completed</span>

          </div>

        </div>

      </div>

      {/* ================= AI TIMELINE ================= */}

      <div className="section">

        <div className="section-title">

          <FaCalendarAlt />

          <h2>AI Sprint Timeline</h2>

        </div>

        <div className="timeline">

          <div className="timeline-item">

            <span>Week 1</span>

            <div className="timeline-bar">

              <div
                className="timeline-fill"
                style={{ width: "100%" }}
              ></div>

            </div>

            <strong>Planning</strong>

          </div>

          <div className="timeline-item">

            <span>Week 2</span>

            <div className="timeline-bar">

              <div
                className="timeline-fill"
                style={{ width: "82%" }}
              ></div>

            </div>

            <strong>Development</strong>

          </div>

          <div className="timeline-item">

            <span>Week 3</span>

            <div className="timeline-bar">

              <div
                className="timeline-fill"
                style={{ width: "55%" }}
              ></div>

            </div>

            <strong>Testing</strong>

          </div>

          <div className="timeline-item">

            <span>Week 4</span>

            <div className="timeline-bar">

              <div
                className="timeline-fill"
                style={{ width: "20%" }}
              ></div>

            </div>

            <strong>Deployment</strong>

          </div>

        </div>

      </div>

      {/* ================= AI RISK ANALYSIS ================= */}

      <div className="section">

        <div className="section-title">

          <FaExclamationTriangle />

          <h2>AI Risk Analysis</h2>

        </div>

        <div className="risk-grid">

          <div className="risk-card high">

            <h3>High Risk</h3>

            <p>

              Backend API integration is
              delayed.

            </p>

          </div>

          <div className="risk-card medium">

            <h3>Medium Risk</h3>

            <p>

              Dashboard testing has not
              started.

            </p>

          </div>

          <div className="risk-card low">

            <h3>Low Risk</h3>

            <p>

              UI design is progressing
              normally.

            </p>

          </div>

        </div>

      </div>

      {/* ================= PROJECT HEALTH ================= */}

      <div className="section">

        <div className="section-title">

          <FaChartLine />

          <h2>Project Health</h2>

        </div>

        <div className="dashboard-grid">

          <div className="dashboard-card">

            <h2>82%</h2>

            <p>Overall Health</p>

          </div>

          <div className="dashboard-card">

            <h2>18%</h2>

            <p>Productivity Increase</p>

          </div>

          <div className="dashboard-card">

            <h2>5</h2>

            <p>Pending Reviews</p>

          </div>

          <div className="dashboard-card">

            <h2>3</h2>

            <p>Blocked Tasks</p>

          </div>

        </div>

      </div>

            {/* ================= AI CHAT ================= */}

      <div className="section">

        <div className="section-title">

          <FaComments />

          <h2>AI Project Copilot</h2>

        </div>

        <div className="chat-container">

          <div className="chat-messages">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`chat-message ${msg.role}`}
              >

                <div className="chat-avatar">

                  {msg.role === "assistant" ? (

                    <FaRobot />

                  ) : (

                    <FaUsers />

                  )}

                </div>

                <div className="chat-bubble">

                  {msg.content}

                </div>

              </div>

            ))}

            {loading && (

              <div className="chat-message assistant">

                <div className="chat-avatar">

                  <FaRobot />

                </div>

                <div className="chat-bubble">

                  <span className="typing-dot"></span>

                  <span className="typing-dot"></span>

                  <span className="typing-dot"></span>

                </div>

              </div>

            )}

            <div ref={messagesEndRef}></div>

          </div>

          <div className="chat-input">

            <button
              className="icon-btn"
              title="Upload Image"
            >
              <FaImage />
            </button>

            <button
              className="icon-btn"
              title="Voice Input"
            >
              <FaMicrophone />
            </button>

            <input

              type="text"

              placeholder="Ask AI to create tasks, generate reports, analyze risks, or plan your project..."

              value={input}

              onChange={(e) =>
                setInput(e.target.value)
              }

              onKeyDown={handleKeyDown}

            />

            <button

              className="send-btn"

              onClick={handleSend}

            >

              <FaPaperPlane />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AIAssistant;

  