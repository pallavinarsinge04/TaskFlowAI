import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const menu = [
    {
      category: "MAIN",
      items: [
        { icon: "🏠", title: "Dashboard", path: "/dashboard" },
        { icon: "📝", title: "Tasks", path: "/tasks" },
        { icon: "📁", title: "Projects", path: "/projects" },
        { icon: "👥", title: "Team", path: "/team" },
        { icon: "📅", title: "Calendar", path: "/calendar" },
      ],
    },

    {
      category: "AI TOOLS",
      items: [
        { icon: "🤖", title: "AI Task Analyzer", path: "/ai-analyzer" },
        { icon: "🧠", title: "AI Assistant", path: "/ai-assistant" },
      ],
    },

    {
      category: "PRODUCTIVITY",
      items: [
        { icon: "📊", title: "Analytics", path: "/analytics" },
        { icon: "⏱", title: "Time Tracker", path: "/time-tracker" },
        { icon: "🔔", title: "Notifications", path: "/notifications" },
      ],
    },

    {
      category: "COMMUNICATION",
      items: [
        { icon: "💬", title: "Team Chat", path: "/chat" },
        { icon: "🎥", title: "Meeting", path: "/meeting" },
      ],
    },

    {
      category: "ACCOUNT",
      items: [
        { icon: "👤", title: "Profile", path: "/profile" },
        { icon: "⚙️", title: "Settings", path: "/settings" },
        { icon: "🚪", title: "Logout", path: "/login" },
      ],
    },
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        🚀
        <div>
          <h2>TaskFlow AI</h2>
          <small>Project Manager</small>
        </div>
      </div>

      {menu.map((section) => (
        <div key={section.category} className="menu-section">

          <p className="menu-title">
            {section.category}
          </p>

          {section.items.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <span className="menu-icon">{item.icon}</span>

              <span>{item.title}</span>
            </NavLink>
          ))}

        </div>
      ))}

    </aside>
  );
}

export default Sidebar;