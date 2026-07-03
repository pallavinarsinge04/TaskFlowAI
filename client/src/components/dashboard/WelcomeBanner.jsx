import "./WelcomeBanner.css";
import { FaRocket, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function WelcomeBanner() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (

    <div className="welcome-banner">

      <div className="welcome-content">

        <span className="welcome-tag">

          🚀 Welcome Back

        </span>

        <h1>

          {greeting},

          <span>

            {" "}
            {user.name || "User"}

          </span>

        </h1>

        <p>

          Manage your projects, tasks, meetings and
          AI workflow from one intelligent dashboard.

        </p>

        <button
          onClick={() => navigate("/projects")}
        >

          Open Projects

          <FaArrowRight />

        </button>

      </div>

      <div className="welcome-image">

        <div className="hero-circle">

          <FaRocket />

        </div>

      </div>

    </div>

  );

}

export default WelcomeBanner;