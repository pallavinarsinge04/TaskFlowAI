import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaFolderOpen,
  FaTasks,
  FaRobot,
  FaCalendarAlt,
  FaChartBar,
  FaUsers,
  FaBell,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const menu = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      title: "Projects",
      icon: <FaFolderOpen />,
      path: "/projects",
    },
    {
      title: "Tasks",
      icon: <FaTasks />,
      path: "/tasks",
    },
  {
  title: "AI Copilot",
  icon: <FaRobot />,
  path: "/ai-assistant",
},
    {
      title: "Calendar",
      icon: <FaCalendarAlt />,
      path: "/calendar",
    },
    {
      title: "Analytics",
      icon: <FaChartBar />,
      path: "/analytics",
    },
    {
      title: "Team",
      icon: <FaUsers />,
      path: "/team",
    },
    {
      title: "Notifications",
      icon: <FaBell />,
      path: "/notifications",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}

      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(true)}
      >
        <FaBars />
      </button>

      {/* Overlay */}

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`sidebar

        ${collapsed ? "collapsed" : ""}

        ${mobileOpen ? "mobile-open" : ""}
        `}
      >
        {/* Header */}

        <div className="sidebar-header">
          {!collapsed && (
            <div className="sidebar-logo">
              🚀 TaskFlowAI
            </div>
          )}

          <button
            className="collapse-btn"
            onClick={() =>
              setCollapsed(!collapsed)
            }
          >
            {collapsed ? (
              <FaChevronRight />
            ) : (
              <FaChevronLeft />
            )}
          </button>

          <button
            className="mobile-close-btn"
            onClick={() => setMobileOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* User */}

        {!collapsed && (
          <div className="sidebar-user">
            <img
              src="https://ui-avatars.com/api/?name=TaskFlowAI"
              alt="User"
            />

            <div>
              <h4>Pallavi</h4>

              <p>Project Manager</p>
            </div>
          </div>
        )}

        {/* Menu */}

        <nav className="sidebar-menu">
          {menu.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
              onClick={() =>
                setMobileOpen(false)
              }
            >
              <span className="icon">
                {item.icon}
              </span>

              {!collapsed && (
                <span>{item.title}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}

        {!collapsed && (
          <div className="sidebar-footer">
            <h4>AI Productivity</h4>

            <div className="progress">
              <div
                className="progress-fill"
                style={{
                  width: "82%",
                }}
              />
            </div>

            <p>82% Productivity</p>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;