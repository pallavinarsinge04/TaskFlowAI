import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="navbar">

      <div className="navbar-left">

        <div className="search-box">

          <input
            type="text"
            placeholder="Search projects, tasks..."
          />

        </div>

      </div>

      <div className="navbar-right">

        <div className="nav-icon">
          🔔
          <span className="badge">5</span>
        </div>

        <div className="nav-icon">
          💬
          <span className="badge">3</span>
        </div>

        <div className="nav-icon">
          📅
        </div>

        <div className="date">
          {today}
        </div>

        <div className="user-info">

          <img
            src="https://i.pravatar.cc/150?img=8"
            alt="profile"
          />

          <div>

            <h4>{user?.name || "User"}</h4>

            <p>{user?.role || "Member"}</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;