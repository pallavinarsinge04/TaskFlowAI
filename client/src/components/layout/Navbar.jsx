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

      <div className="navbar-right">

        <button className="create-btn">
          <FaPlus />
          Create
        </button>

        <button className="icon-btn">
          <FaMoon />
        </button>

        <button className="icon-btn notification">

          <FaBell />

          <span className="badge">
            3
          </span>

        </button>

        <button className="icon-btn">
          <FaEnvelope />
        </button>

        <button className="icon-btn">
          <FaQuestionCircle />
        </button>

        <div className="date">
          {today}
        </div>

        <div className="profile">

          <img
  src={
    user?.profilePic ||
    "https://i.pravatar.cc/150"
  }
  alt="Profile"
  className="navbar-profile"
/>

          <div>

            <h4>Pallavi</h4>

            <p>Project Manager</p>

          </div>

          <FaChevronDown />

        </div>

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