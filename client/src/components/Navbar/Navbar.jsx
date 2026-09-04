import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaMoon,
  FaSun,
  FaRobot,
  FaCog,
  FaChevronDown,
  FaBars,
} from "react-icons/fa";

import "./Navbar.css";
import NotificationBell from "../notifications/NotificationBell";

function Navbar({ toggleSidebar }) {
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const profileRef = useRef(null);

  /*
  ======================================================
  CLOSE PROFILE MENU WHEN CLICKING OUTSIDE
  ======================================================
  */

  useEffect(() => {
    const closeMenus = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "click",
      closeMenus
    );

    return () => {
      document.removeEventListener(
        "click",
        closeMenus
      );
    };
  }, []);

  /*
  ======================================================
  DARK MODE
  ======================================================
  */

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add(
        "dark-mode"
      );
    } else {
      document.body.classList.remove(
        "dark-mode"
      );
    }
  }, [darkMode]);

  /*
  ======================================================
  RENDER
  ======================================================
  */

  return (
    <header className="navbar">

      {/* ==================================================
          LEFT
      ================================================== */}

      <div className="navbar-left">

        <button
          type="button"
          className="hamburger-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>

        <h2 className="navbar-logo">
          🚀 TaskFlowAI
        </h2>

      </div>


      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="navbar-search">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search projects, tasks..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

      </div>


      {/* ==================================================
          RIGHT
      ================================================== */}

      <div className="navbar-right">

        {/* ==================================================
            AI COPILOT
        ================================================== */}

        <Link
          to="/ai"
          className="navbar-ai-btn"
        >
          <FaRobot />

          <span>
            AI Copilot
          </span>
        </Link>


        {/* ==================================================
            NOTIFICATIONS
        ================================================== */}

        <NotificationBell />


        {/* ==================================================
            THEME
        ================================================== */}

        <button
          type="button"
          className="icon-btn"
          onClick={() =>
            setDarkMode(
              (currentMode) =>
                !currentMode
            )
          }
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {darkMode ? (
            <FaSun />
          ) : (
            <FaMoon />
          )}
        </button>


        {/* ==================================================
            SETTINGS
        ================================================== */}

        <Link
          to="/settings"
          className="icon-btn"
          title="Settings"
        >
          <FaCog />
        </Link>


        {/* ==================================================
            PROFILE
        ================================================== */}

        <div
          className="profile-wrapper"
          ref={profileRef}
        >

          <button
            type="button"
            className="profile-btn"
            onClick={() =>
              setProfileOpen(
                (currentOpen) =>
                  !currentOpen
              )
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


          {/* ==================================================
              PROFILE DROPDOWN
          ================================================== */}

          {profileOpen && (
            <div className="profile-dropdown">

              <Link
                to="/profile"
                onClick={() =>
                  setProfileOpen(false)
                }
              >
                My Profile
              </Link>

              <Link
                to="/settings"
                onClick={() =>
                  setProfileOpen(false)
                }
              >
                Settings
              </Link>

              <Link
                to="/login"
                onClick={() =>
                  setProfileOpen(false)
                }
              >
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