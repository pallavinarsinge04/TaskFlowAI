import {
  FaHome,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaBell,
  FaCog,
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

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* LOGO */}
      <div className="logo">
        {!collapsed && <h2>TaskFlow</h2>}

        <button onClick={() => setCollapsed(!collapsed)}>
          ☰
        </button>
      </div>

      {/* MENU */}
      <nav>
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

    </div>
  );
}

export default Sidebar;