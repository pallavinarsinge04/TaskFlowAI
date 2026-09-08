import React, { useState } from "react";
import "./AICommandCenter.css";

import AIAssistant from "./AIAssistant";
import AITaskGenerator from "./AITaskGenerator";
import AITaskPrioritizer from "./AITaskPrioritizer";
import AIDailyPlanner from "./AIDailyPlanner";
import AIChatAssistant from "./AIChatAssistant";


const AICommandCenter = ({ project, onTasksUpdated }) => {
  const [activeTool, setActiveTool] = useState("overview");

  const tools = [
    {
      id: "overview",
      icon: "🧠",
      title: "Project Insights",
      description: "Analyze project health, risks and recommendations.",
    },
    {
      id: "command",
      icon: "⚡",
      title: "AI Task Command",
      description: "Create and manage tasks using natural language.",
    },
    {
      id: "generate",
      icon: "✨",
      title: "Generate Tasks",
      description: "Turn requirements into actionable tasks.",
    },
    {
      id: "prioritize",
      icon: "🎯",
      title: "Prioritize Tasks",
      description: "Get AI-powered priority and deadline suggestions.",
    },
    {
      id: "planner",
      icon: "📅",
      title: "Daily Planner",
      description: "Create an AI-powered plan for your day.",
    },
    {
      id: "chat",
      icon: "💬",
      title: "AI Chat",
      description: "Ask questions about your projects and tasks.",
    },
  ];

  if (!project) {
    return (
      <section className="ai-command-center">
        <div className="ai-empty-state">
          <div className="ai-empty-icon">🤖</div>

          <h2>AI Command Center</h2>

          <p>
            Create a project first to unlock project-specific AI features.
          </p>
        </div>
      </section>
    );
  }

  const handleTasksUpdated = () => {
    if (typeof onTasksUpdated === "function") {
      onTasksUpdated();
    }
  };

  const renderTool = () => {
    switch (activeTool) {
      case "overview":
        return <AIAssistant project={project} />;

      case "command":
        return (
          <AITaskCommand
            project={project}
            onTaskCreated={handleTasksUpdated}
          />
        );

      case "generate":
        return (
          <AITaskGenerator
            project={project}
            onTasksCreated={handleTasksUpdated}
          />
        );

      case "prioritize":
        return (
          <AITaskPrioritizer
            project={project}
            onTasksUpdated={handleTasksUpdated}
          />
        );

      case "planner":
        return <AIDailyPlanner project={project} />;

      case "chat":
        return <AIChatAssistant project={project} />;

      default:
        return <AIAssistant project={project} />;
    }
  };

  return (
    <section className="ai-command-center">
      <div className="ai-command-header">
        <div>
          <div className="ai-title-row">
            <span className="ai-main-icon">🤖</span>

            <div>
              <h2>AI Command Center</h2>

              <p>
                Intelligent assistance for{" "}
                <strong>{project.name}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="ai-status">
          <span className="ai-status-dot"></span>
          AI Ready
        </div>
      </div>

      <div className="ai-tool-grid">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            className={`ai-tool-card ${
              activeTool === tool.id ? "active" : ""
            }`}
            onClick={() => setActiveTool(tool.id)}
          >
            <div className="ai-tool-icon">{tool.icon}</div>

            <div className="ai-tool-content">
              <h3>{tool.title}</h3>

              <p>{tool.description}</p>
            </div>

            <span className="ai-tool-arrow">→</span>
          </button>
        ))}
      </div>

      <div className="ai-command-content">
        {renderTool()}
      </div>
    </section>
  );
};

export default AICommandCenter;