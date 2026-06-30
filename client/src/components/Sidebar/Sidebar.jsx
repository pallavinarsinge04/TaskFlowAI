import {
  FaHome,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaTasks />, label: "Tasks", path: "/tasks" },
    { icon: <FaProjectDiagram />, label: "Projects", path: "/projects" },
    { icon: <FaUsers />, label: "Team", path: "/team" },
    { icon: <FaBell />, label: "Notifications", path: "/notifications" },
    { icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* Logo */}
      <div className="logo">
        {!collapsed && <h2>TaskFlow</h2>}

        <button onClick={() => setCollapsed(!collapsed)}>
          ☰
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="nav-item"
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span>

            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>

    </div>
  );
}

export default Sidebar;