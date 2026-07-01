import "./Navbar.css";
import {
  FaBell,
  FaEnvelope,
  FaMoon,
  FaPlus,
  FaSearch,
  FaQuestionCircle,
  FaChevronDown,
} from "react-icons/fa";
import { useEffect, useState } from "react";
function Navbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
 const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user"))
);
const notifications = JSON.parse(
  localStorage.getItem("notifications") || "[]"
);

const unreadCount = notifications.filter(
  (n) => !n.read
).length;
  return (
    <header className="navbar">

      <div className="navbar-left">

        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search projects, tasks, members..."
          />
        </div>

      </div>

      <div className="notification-icon">

  <FaBell />

  {unreadCount > 0 && (

    <span className="badge">

      {unreadCount}

    </span>

  )}

</div>

    </header>
  );
  useEffect(() => {

  const updateProfile = () => {

    setUser(
      JSON.parse(localStorage.getItem("user"))
    );

  };

  window.addEventListener(
    "profilePicUpdated",
    updateProfile
  );

  return () => {

    window.removeEventListener(
      "profilePicUpdated",
      updateProfile
    );

  };

}, []);
}

export default Navbar;