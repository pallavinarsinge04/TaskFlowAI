import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const menu = [
    { icon: "📊", title: "Dashboard", path: "/dashboard" },
    { icon: "📝", title: "Tasks", path: "/tasks" },
    { icon: "📁", title: "Projects", path: "/projects" },
    { icon: "👥", title: "Team", path: "/team" },
    { icon: "📅", title: "Calendar", path: "/calendar" },
    { icon: "📈", title: "Analytics", path: "/analytics" },
    { icon: "⏱", title: "Time Tracker", path: "/time-tracker" },
    { icon: "💬", title: "Chat", path: "/chat" },
    { icon: "🎥", title: "Meeting", path: "/meeting" },
    { icon: "🤖", title: "AI Analyzer", path: "/ai-analyzer" },
    { icon: "🧠", title: "AI Assistant", path: "/ai-assistant" },
    { icon: "🔔", title: "Notifications", path: "/notifications" },
    { icon: "👤", title: "Profile", path: "/profile" },
    { icon: "⚙️", title: "Settings", path: "/settings" },
    { icon: "🚪", title: "Logout", path: "/login" },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>🚀 TaskFlow AI</h2>
      </div>

      <div className="sidebar-menu">
        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className="sidebar-card"
          >
            <span className="icon">{item.icon}</span>

            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>

    </aside>
  );
}

export default Sidebar;