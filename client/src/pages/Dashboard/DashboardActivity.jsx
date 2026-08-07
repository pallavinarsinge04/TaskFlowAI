import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const stats = [
  { label: "Tasks Completed", value: "24", accent: "#2563eb" },
  { label: "Pending Review", value: "7", accent: "#f59e0b" },
  { label: "Team Active", value: "12", accent: "#10b981" },
];

const initialActivities = [
  {
    id: 1,
    title: "Project kickoff completed",
    detail: "Reviewed requirements and aligned the sprint plan.",
    time: "10:00 AM",
    type: "Planning",
    color: "#2563eb",
  },
  {
    id: 2,
    title: "Design review submitted",
    detail: "New dashboard wireframes were shared with the team.",
    time: "11:30 AM",
    type: "Design",
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Backend API deployment",
    detail: "Production deployment finished successfully.",
    time: "1:15 PM",
    type: "Development",
    color: "#10b981",
  },
];

function DashboardActivity() {
  const [activities, setActivities] = useState(initialActivities);

  const addActivity = () => {
    const newActivity = {
      id: Date.now(),
      title: "New activity logged",
      detail: "You added a quick update from the dashboard.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "Update",
      color: "#f59e0b",
    };
    setActivities((prev) => [newActivity, ...prev]);
    toast.success("Activity added");
  };

  return (
    <section className="dashboard-widget dashboard-activity">
      <div className="widget-header">
        <div>
          <h2>Activity Overview</h2>
          <p>Track your team&apos;s progress and recent updates</p>
        </div>
        <button type="button" className="widget-action-btn" onClick={addActivity}>
          + Add Activity
        </button>
      </div>

      <div className="activity-stats">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="activity-stat"
            whileHover={{ scale: 1.03 }}
          >
            <div className="activity-stat-label">{stat.label}</div>
            <div
              className="activity-stat-value"
              style={{ color: stat.accent }}
            >
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      <ul className="activity-feed">
        {activities.map((activity, index) => (
          <motion.li
            key={activity.id}
            className="activity-item"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => toast(`Viewing: ${activity.title}`)}
          >
            <span
              className="activity-dot"
              style={{ background: activity.color }}
            />
            <div>
              <div className="activity-item-title">{activity.title}</div>
              <div className="activity-item-detail">{activity.detail}</div>
            </div>
            <div className="activity-item-meta">
              <div
                className="activity-item-type"
                style={{ color: activity.color }}
              >
                {activity.type}
              </div>
              <div className="activity-item-time">{activity.time}</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default DashboardActivity;
