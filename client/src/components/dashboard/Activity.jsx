import "./Activity.css";
import {
  FaCircle,
  FaTasks,
  FaProjectDiagram,
  FaComments,
  FaUserPlus,
  FaRobot
} from "react-icons/fa";

function Activity() {

  const activities = [
    {
      user: "Pallavi",
      action: "completed task",
      target: "Dashboard UI",
      time: "Just now",
      type: "task",
      online: true
    },
    {
      user: "Amit",
      action: "created project",
      target: "Smart AI Ecommerce",
      time: "5 min ago",
      type: "project",
      online: true
    },
    {
      user: "Riya",
      action: "sent a message",
      target: "Development Team",
      time: "10 min ago",
      type: "chat",
      online: false
    },
    {
      user: "AI Assistant",
      action: "generated",
      target: "Priority Suggestions",
      time: "20 min ago",
      type: "ai",
      online: true
    },
    {
      user: "Karan",
      action: "joined",
      target: "UI Team",
      time: "30 min ago",
      type: "member",
      online: true
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case "task":
        return <FaTasks />;
      case "project":
        return <FaProjectDiagram />;
      case "chat":
        return <FaComments />;
      case "member":
        return <FaUserPlus />;
      case "ai":
        return <FaRobot />;
      default:
        return <FaTasks />;
    }
  };

  return (
    <div className="activity-card">

      <div className="activity-header">

        <div>

          <h2>⚡ Live Team Activity</h2>

          <p>Real-time project updates</p>

        </div>

        <span className="live-status">
          <FaCircle />
          LIVE
        </span>

      </div>

      <div className="activity-list">

        {activities.map((item, index) => (

          <div className="activity-item" key={index}>

            <div className="activity-icon">

              {getIcon(item.type)}

            </div>

            <div className="activity-info">

              <h4>

                {item.user}

                <span className="action">
                  {" "}
                  {item.action}{" "}
                </span>

                <strong>{item.target}</strong>

              </h4>

              <p>{item.time}</p>

            </div>

            <div
              className={
                item.online
                  ? "online"
                  : "offline"
              }
            ></div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Activity;