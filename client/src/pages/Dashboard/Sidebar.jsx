import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaComments,
  FaCalendarAlt,
  FaRobot,
  FaChartBar,
  FaClock,
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <h2>🚀 TaskFlow AI</h2>
        <p>Project Management</p>
      </div>

      <nav>

        <NavLink to="/dashboard">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/projects">
          <FaProjectDiagram />
          <span>Projects</span>
        </NavLink>

        <NavLink to="/tasks">
          <FaTasks />
          <span>Tasks</span>
        </NavLink>

        <NavLink to="/team">
          <FaUsers />
          <span>Team</span>
        </NavLink>

        <NavLink to="/chat">
          <FaComments />
          <span>Team Chat</span>
        </NavLink>

        <NavLink to="/calendar">
          <FaCalendarAlt />
          <span>Calendar</span>
        </NavLink>

        <NavLink to="/analytics">
          <FaChartBar />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/time-tracker">
          <FaClock />
          <span>Time Tracker</span>
        </NavLink>

        <NavLink to="/ai-analyzer">
          <FaRobot />
          <span>AI Analyzer</span>
        </NavLink>

        <NavLink to="/notifications">
          <FaBell />
          <span>Notifications</span>
        </NavLink>

        <NavLink to="/profile">
          <FaUserCircle />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/settings">
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

      <div className="logout">

        <NavLink to="/login">
          <FaSignOutAlt />
          <span>Logout</span>
        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;