import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <h2>🚀 TaskFlow AI</h2>
      </div>

      <nav>

        <NavLink to="/dashboard">
          📊 Dashboard
        </NavLink>

        <NavLink to="/tasks">
          📝 Tasks
        </NavLink>

        <NavLink to="/projects">
          📁 Projects
        </NavLink>

        <NavLink to="/team">
          👥 Team
        </NavLink>

        <NavLink to="/calendar">
          📅 Calendar
        </NavLink>

        <NavLink to="/analytics">
          📈 Analytics
        </NavLink>

        <NavLink to="/time-tracker">
          ⏱ Time Tracker
        </NavLink>

        <NavLink to="/chat">
          💬 Team Chat
        </NavLink>

        <NavLink to="/meeting">
          🎥 Meeting
        </NavLink>

        <NavLink to="/ai-analyzer">
          🤖 AI Analyzer
        </NavLink>

        <NavLink to="/ai-assistant">
          🧠 AI Assistant
        </NavLink>

        <NavLink to="/notifications">
          🔔 Notifications
        </NavLink>

        <NavLink to="/profile">
          👤 Profile
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;