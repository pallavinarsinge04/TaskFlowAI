import React, { useState } from "react";
import "./AICommandCenter.css";

import AIAssistant from "./AIAssistant";
import AITaskGenerator from "./AITaskGenerator";
import AITaskPrioritizer from "./AITaskPrioritizer";
import AIDailyPlanner from "./AIDailyPlanner";
import AIChatAssistant from "./AIChatAssistant";
import AITaskCommand from "./AITaskCommand";

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
    {
      id: "command",
      icon: "⚡",
      title: "AI Task Command",
      description:
        "Create, update, complete or delete tasks using natural language.",
    },
  ];

  const handleTasksUpdated = () => {
    if (typeof onTasksUpdated === "function") {
      onTasksUpdated();
    }
  };

  const renderTool = () => {
    switch (activeTool) {
      case "overview":
        return <AIAssistant project={project} />;

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

      case "command":
        return (
          <AITaskCommand
            project={project}
            onTaskCreated={handleTasksUpdated}
          />
        );

      default:
        return <AIAssistant project={project} />;
    }
  };

  if (!project) {
    return (
      <div className="ai-command-center">
        <div className="ai-command-empty">
          <div className="ai-command-empty-icon">🤖</div>

          <h2>AI Command Center</h2>

          <p>
            Create or select a project to start using the AI project
            management tools.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-command-center">
      <div className="ai-command-center-header">
        <div className="ai-command-center-title">
          <div className="ai-command-center-main-icon">🤖</div>

          <div>
            <h2>AI Command Center</h2>

            <p>
              AI-powered tools for <strong>{project.name}</strong>
            </p>
          </div>
        </div>

        <div className="ai-command-center-badge">
          ✨ AI Powered
        </div>
      </div>

      <div className="ai-command-tools">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            className={`ai-command-tool ${
              activeTool === tool.id ? "active" : ""
            }`}
            onClick={() => {
              console.log("AI tool clicked:", tool.id);
              setActiveTool(tool.id);
            }}
          >
            <span className="ai-command-tool-icon">
              {tool.icon}
            </span>

            <span className="ai-command-tool-content">
              <strong>{tool.title}</strong>
              <small>{tool.description}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="ai-command-tool-panel">
        {renderTool()}
      </div>
    </div>
  );
};

export default AICommandCenter;