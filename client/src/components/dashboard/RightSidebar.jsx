import "./RightSidebar.css";
import {
  FaCloudSun,
  FaCalendarAlt,
  FaBullseye,
  FaRobot,
  FaClock,
  FaStickyNote
} from "react-icons/fa";

function RightSidebar() {

  return (

    <aside className="right-sidebar">

      {/* Weather */}

      <div className="widget">

        <div className="widget-title">

          <FaCloudSun />

          <h3>Weather</h3>

        </div>

        <h1>28°C</h1>

        <p>☀️ Sunny</p>

        <span>Latur, Maharashtra</span>

      </div>

      {/* Calendar */}

      <div className="widget">

        <div className="widget-title">

          <FaCalendarAlt />

          <h3>Today's Schedule</h3>

        </div>

        <ul>

          <li>10:00 AM - Daily Scrum</li>

          <li>01:00 PM - Team Discussion</li>

          <li>04:00 PM - Client Meeting</li>

        </ul>

      </div>

      {/* Goals */}

      <div className="widget">

        <div className="widget-title">

          <FaBullseye />

          <h3>Daily Goals</h3>

        </div>

        <div className="goal">

          <span>Tasks Completed</span>

          <strong>8 / 10</strong>

        </div>

        <div className="progress">

          <div
            className="fill"
            style={{ width: "80%" }}
          ></div>

        </div>

      </div>

      {/* AI */}

      <div className="widget">

        <div className="widget-title">

          <FaRobot />

          <h3>AI Tip</h3>

        </div>

        <p>

          Finish high priority tasks before
          starting new projects.

        </p>

      </div>

      {/* Focus */}

      <div className="widget">

        <div className="widget-title">

          <FaClock />

          <h3>Focus Time</h3>

        </div>

        <h2>25 : 00</h2>

        <button>Start</button>

      </div>

      {/* Sticky Notes */}

      <div className="widget">

        <div className="widget-title">

          <FaStickyNote />

          <h3>Quick Notes</h3>

        </div>

        <textarea
          placeholder="Write notes..."
        ></textarea>

      </div>

    </aside>

  );
}

export default RightSidebar;