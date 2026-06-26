import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menu = [
    { icon: "🏠", title: "Dashboard", path: "/dashboard" },
    { icon: "📝", title: "Tasks", path: "/tasks" },
    { icon: "📁", title: "Projects", path: "/projects" },
    { icon: "🤖", title: "AI Task Analyzer", path: "/ai-analyzer" },
    { icon: "🧠", title: "AI Assistant", path: "/ai-assistant" },
    { icon: "📊", title: "Analytics", path: "/analytics" },
    { icon: "⏱", title: "Time Tracker", path: "/time-tracker" },
    { icon: "💬", title: "Chat", path: "/chat" },
    { icon: "🎥", title: "Meetings", path: "/meeting" },
    { icon: "👥", title: "Team", path: "/team" },
    { icon: "📅", title: "Calendar", path: "/calendar" },
    { icon: "🔔", title: "Notifications", path: "/notifications" },
    { icon: "👤", title: "Profile", path: "/profile" },
    { icon: "⚙️", title: "Settings", path: "/settings" },
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        <h2>🚀 TaskFlow AI</h2>
        <p>Project Management</p>
      </div>

      <nav className="menu">

        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="icon">{item.icon}</span>

            <span>{item.title}</span>

          </NavLink>
        ))}

      </nav>

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;