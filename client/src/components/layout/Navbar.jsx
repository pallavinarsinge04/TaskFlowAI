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

function Navbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
            src="https://i.pravatar.cc/150?img=12"
            alt=""
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
}

export default Navbar;