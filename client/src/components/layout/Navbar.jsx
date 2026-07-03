import { useState, useEffect } from "react";
import {
  FaSearch,
  FaBell,
  FaCog
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());

  const [profilePic, setProfilePic] = useState(
    JSON.parse(localStorage.getItem("user"))?.profilePic ||
      "https://i.pravatar.cc/150?img=12"
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {
      name: "Guest User",
      email: "guest@taskflow.ai"
    }
  );

  useEffect(() => {

    const interval = setInterval(() => {

      setTime(new Date());

    }, 1000);

    const updateProfile = () => {

      const current =
        JSON.parse(localStorage.getItem("user")) || {};

      setUser(current);

      setProfilePic(
        current.profilePic ||
          "https://i.pravatar.cc/150?img=12"
      );

    };

    window.addEventListener(
      "profileUpdated",
      updateProfile
    );

    return () => {

      clearInterval(interval);

      window.removeEventListener(
        "profileUpdated",
        updateProfile
      );

    };

  }, []);

  return (

    <header className="navbar">

      {/* Search */}

      <div className="navbar-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search projects, tasks..."
        />

      </div>

      {/* Right Side */}

      <div className="navbar-right">

        <div className="navbar-time">

          {time.toLocaleTimeString()}

        </div>

        <button
          className="icon-btn"
          onClick={() =>
            navigate("/notifications")
          }
        >

          <FaBell />

          <span className="badge">3</span>

        </button>

        <button
          className="icon-btn"
          onClick={() =>
            navigate("/settings")
          }
        >

          <FaCog />

        </button>

        <div
          className="navbar-profile"
          onClick={() =>
            navigate("/settings")
          }
        >

          <img
            src={profilePic}
            alt="Profile"
          />

          <div>

            <h4>{user.name || "Guest User"}</h4>

            <span>
              {user.email || ""}
            </span>

          </div>

        </div>

      </div>

    </header>

  );

}

export default Navbar;