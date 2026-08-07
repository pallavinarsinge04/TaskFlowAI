import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaRobot,
  FaPlus,
} from "react-icons/fa";

import "./DashboardHeader.css";

function DashboardHeader() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { id: 1, title: "New project assigned", time: "2 min ago", read: false },
    { id: 2, title: "Sprint planning at 3 PM", time: "30 min ago", read: false },
    { id: 3, title: "AI generated weekly report", time: "1 hour ago", read: false },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = currentTime.toLocaleTimeString();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleSearch = (event) => {
    if (event.key === "Enter" && search.trim()) {
      navigate(`/tasks?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <h1>Dashboard</h1>
        <p>Welcome back! Here&apos;s what&apos;s happening today.</p>
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
            onKeyDown={handleSearch}
          />
        </div>

        <button
          type="button"
          className="header-btn ai-btn"
          onClick={() => navigate("/ai-assistant")}
        >
          <FaRobot />
          <span>AI Assistant</span>
        </button>

        <button
          type="button"
          className="header-btn"
          onClick={() => navigate("/projects")}
        >
          <FaPlus />
          <span>New Project</span>
        </button>

        <div className="notification-wrapper" ref={notificationRef}>
          <button
            type="button"
            className="header-icon-btn"
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-expanded={showNotifications}
            aria-label="Toggle notifications"
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="notification-count">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <span>{unreadCount} New</span>
              </div>

              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`notification-item ${item.read ? "read" : ""}`}
                  onClick={() => {
                    markAsRead(item.id);
                    navigate("/notifications");
                  }}
                >
                  <div
                    className="notification-dot"
                    style={{ opacity: item.read ? 0.3 : 1 }}
                  />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
