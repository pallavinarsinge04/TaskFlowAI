import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaBell,
  FaMoon,
  FaSun,
  FaRobot,
  FaCog,
  FaChevronDown,
  FaBars
} from "react-icons/fa";

import "./Navbar.css";

function Navbar({ toggleSidebar }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "Project Alpha Updated",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "New Task Assigned",
      time: "15 min ago",
    },
    {
      id: 3,
      title: "AI Generated Sprint Plan",
      time: "1 hour ago",
    },
  ];

  useEffect(() => {
    const closeMenus = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", closeMenus);

    return () =>
      document.removeEventListener("click", closeMenus);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <header className="navbar">

      {/* LEFT */}

      <div className="navbar-left">

        <button
          className="hamburger-btn"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <h2 className="navbar-logo">
          🚀 TaskFlowAI
        </h2>

      </div>

      {/* SEARCH */}

      <div className="navbar-search">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search projects, tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* RIGHT */}

      <div className="navbar-right">

        {/* AI */}

        <Link
          to="/ai"
          className="navbar-ai-btn"
        >
          <FaRobot />
          <span>AI Copilot</span>
        </Link>

        {/* Notifications */}

        <div
          className="notification-wrapper"
          ref={notificationRef}
        >

          <button
            className="icon-btn"
            onClick={() =>
              setNotificationOpen(!notificationOpen)
            }
          >
            <FaBell />

            <span className="notification-badge">
              {notifications.length}
            </span>

          </button>

          {notificationOpen && (

            <div className="notification-dropdown">

              <div className="dropdown-title">

                Notifications

              </div>

              {notifications.map((item) => (

                <div
                  className="notification-item"
                  key={item.id}
                >

                  <strong>

                    {item.title}

                  </strong>

                  <small>

                    {item.time}

                  </small>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Theme */}

        <button
          className="icon-btn"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >

          {darkMode ? (

            <FaSun />

          ) : (

            <FaMoon />

          )}

        </button>

        {/* Settings */}

        <button className="icon-btn">

          <FaCog />

        </button>

        {/* Profile */}

        <div
          className="profile-wrapper"
          ref={profileRef}
        >

          <button
            className="profile-btn"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
          >

            <img
              src="https://ui-avatars.com/api/?name=Pallavi"
              alt="Profile"
            />

            <span>

              Pallavi

            </span>

            <FaChevronDown />

          </button>

          {profileOpen && (

            <div className="profile-dropdown">

              <Link to="/profile">

                My Profile

              </Link>

              <Link to="/settings">

                Settings

              </Link>

              <Link to="/login">

                Logout

              </Link>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;