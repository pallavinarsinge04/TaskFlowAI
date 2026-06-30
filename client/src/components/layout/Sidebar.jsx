import {
  FaHome,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaBell,
  FaCog,
} from "react-icons/fa";

import "./sidebar.css";

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="logo">
        {!collapsed && <h2>TaskFlow</h2>}

        <button onClick={() => setCollapsed(!collapsed)}>
          ☰
        </button>
      </div>

      <nav>

        <Item icon={<FaHome />} label="Dashboard" collapsed={collapsed} />
        <Item icon={<FaTasks />} label="Tasks" collapsed={collapsed} />
        <Item icon={<FaProjectDiagram />} label="Projects" collapsed={collapsed} />
        <Item icon={<FaUsers />} label="Team" collapsed={collapsed} />
        <Item icon={<FaBell />} label="Notifications" collapsed={collapsed} />
        <Item icon={<FaCog />} label="Settings" collapsed={collapsed} />

      </nav>

    </div>
  );
}

function Item({ icon, label, collapsed }) {
  return (
    <div className="nav-item">
      <span>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </div>
  );
}

export default Sidebar;