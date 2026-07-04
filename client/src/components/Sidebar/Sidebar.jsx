import { useState } from "react";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaRobot,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

import { NavLink ,useNavigate } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard"
    },
    {
      title: "Projects",
      icon: <FaProjectDiagram />,
      path: "/projects"
    },
    {
      title: "Tasks",
      icon: <FaTasks />,
      path: "/tasks"
    },
    {
      title: "Team",
      icon: <FaUsers />,
      path: "/team"
    },
    {
      title: "AI Assistant",
      icon: <FaRobot />,
      path: "/ai-assistant"
    },
    {
      title: "Analytics",
      icon: <FaChartBar />,
      path: "/analytics"
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings"
    }
  ];

  return (

    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="sidebar-top">

        <div className="sidebar-logo">

          {!collapsed && <h2>TaskFlow AI</h2>}

        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >

          {collapsed ? <FaBars /> : <FaTimes />}

        </button>

      </div>

      <nav>

        {menus.map((menu, index) => (

          <NavLink

            key={index}

            to={menu.path}

            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }

          >

            <span className="sidebar-icon">

              {menu.icon}

            </span>

            {!collapsed &&

              <span>{menu.title}</span>

            }

          </NavLink>

        ))}

      </nav>

      <div className="sidebar-bottom">
        
        <button className="logout-btn">

          <FaSignOutAlt />

          {!collapsed &&
 <nav link to="/login" className="sidebar-link">
            <span>Logout</span>
</nav>
          }

        </button>

      </div>

    </aside>

  );

}

export default Sidebar;