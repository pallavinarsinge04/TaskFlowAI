import { useState } from "react";
import "./Activity.css";
import {
  FaHistory,
  FaCheckCircle,
  FaTasks,
  FaUserPlus,
  FaTrash,
  FaProjectDiagram,
  FaFilter
} from "react-icons/fa";

function Activity() {

  const [activities] = useState([
    {
      id: 1,
      type: "task",
      title: "Task Completed",
      description: "Landing Page UI completed successfully.",
      time: "5 min ago"
    },
    {
      id: 2,
      type: "project",
      title: "Project Created",
      description: "TaskFlow AI Dashboard project created.",
      time: "20 min ago"
    },
    {
      id: 3,
      type: "member",
      title: "New Team Member",
      description: "John Smith joined Development Team.",
      time: "1 hour ago"
    },
    {
      id: 4,
      type: "delete",
      title: "Task Deleted",
      description: "Old Bug Report removed.",
      time: "Yesterday"
    },
    {
      id: 5,
      type: "task",
      title: "Task Updated",
      description: "Authentication module moved to In Progress.",
      time: "Yesterday"
    }
  ]);

  const [filter, setFilter] = useState("All");

  const filteredActivities =
    filter === "All"
      ? activities
      : activities.filter(item => item.type === filter);

  const getIcon = (type) => {

    switch (type) {

      case "task":
        return <FaTasks />;

      case "project":
        return <FaProjectDiagram />;

      case "member":
        return <FaUserPlus />;

      case "delete":
        return <FaTrash />;

      default:
        return <FaCheckCircle />;

    }

  };

  return (

    <div className="activity">

      <div className="activity-header">

        <div>

          <h2>

            <FaHistory />

            Recent Activity

          </h2>

          <p>Track everything happening in your workspace</p>

        </div>

        <div className="activity-filter">

          <FaFilter />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option>All</option>
            <option value="task">task</option>
            <option value="project">project</option>
            <option value="member">member</option>
            <option value="delete">delete</option>
          </select>

        </div>

      </div>

      <div className="timeline">

        {filteredActivities.length === 0 ? (

          <div className="empty-activity">

            <FaHistory size={50} />

            <h3>No Activity</h3>

            <p>No records found.</p>

          </div>

        ) : (

          filteredActivities.map(activity => (

            <div
              className="timeline-item"
              key={activity.id}
            >

              <div className={`timeline-icon ${activity.type}`}>

                {getIcon(activity.type)}

              </div>

              <div className="timeline-content">

                <h4>{activity.title}</h4>

                <p>{activity.description}</p>

                <span>{activity.time}</span>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Activity;