import { useEffect, useState } from "react";
import "./WelcomeBanner.css";
import {
  FaSun,
  FaMoon,
  FaCloudSun,
  FaCalendarAlt,
  FaClock
} from "react-icons/fa";

function WelcomeBanner() {

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [time, setTime] = useState(new Date());

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const hour = time.getHours();

  let greeting = "Good Evening";
  let icon = <FaMoon />;

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
    icon = <FaSun />;
  }
  else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
    icon = <FaCloudSun />;
  }

  const today = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const currentTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (

    <div className="welcome-banner">

      <div className="welcome-left">

        <div className="welcome-top">

          <span className="greeting-icon">
            {icon}
          </span>

          <div>

            <h1>
              {greeting},
              {" "}
              {user.name || "User"} 👋
            </h1>

            <p>
              Welcome back to your AI Productivity Dashboard.
            </p>

          </div>

        </div>

        <div className="welcome-info">

          <div className="info-box">

            <FaCalendarAlt />

            <span>{today}</span>

          </div>

          <div className="info-box">

            <FaClock />

            <span>{currentTime}</span>

          </div>

        </div>

      </div>

      <div className="welcome-right">

        <img

          src={
            user.profilePic ||
            "https://i.pravatar.cc/150?img=12"
          }

          alt="Profile"

          className="welcome-avatar"

        />

        <div className="weather-box">

          ☀️ 29°C

          <span>Clear Sky</span>

        </div>

      </div>

    </div>

  );

}

export default WelcomeBanner;