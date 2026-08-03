import { useState, useEffect } from "react";
import {
  FaSearch,
  FaBell,
  FaRobot,
  FaPlus,
} from "react-icons/fa";

import "./DashboardHeader.css";

function DashboardHeader() {
  const [search, setSearch] = useState("");

  const [currentTime, setCurrentTime] = useState(new Date());

  const [notifications] = useState([
    {
      id: 1,
      title: "New project assigned",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Sprint planning at 3 PM",
      time: "30 min ago",
    },
    {
      id: 3,
      title: "AI generated weekly report",
      time: "1 hour ago",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const today = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = currentTime.toLocaleTimeString();

  return (
    <header className="dashboard-header">

      <div className="dashboard-header-left">

        <h1>Dashboard</h1>

        <p>
          Welcome back! Here's what's happening today.
        </p>

        <div className="dashboard-date">
          <span>{today}</span>
          <span>{time}</span>
        </div>

      </div>

      <div className="dashboard-header-right">

        <div className="dashboard-search">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search projects, tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <button className="header-btn ai-btn">
          <FaRobot />
          <span>AI Assistant</span>
        </button>

        <button className="header-btn">
          <FaPlus />
          <span>New Project</span>
        </button>

        <button className="header-icon-btn">
          <FaBell />

          <span className="notification-count">
            {notifications.length}
          </span>
        </button>
                {/* Notifications Dropdown */}

        <div className="notification-dropdown">

          <div className="dropdown-header">

            <h3>Notifications</h3>

            <span>{notifications.length} New</span>

          </div>

          {notifications.map((item) => (

            <div
              key={item.id}
              className="notification-item"
            >

              <div className="notification-dot"></div>

              <div>

                <h4>{item.title}</h4>

                <p>{item.time}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </header>

  );

}

export default DashboardHeader;