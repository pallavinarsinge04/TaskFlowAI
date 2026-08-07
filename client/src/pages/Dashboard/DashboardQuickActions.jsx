import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTasks, FaCalendarAlt, FaUsers } from "react-icons/fa";

const quickActions = [
  {
    id: 1,
    title: "Create Task",
    description: "Start a new task and stay organized.",
    action: "Create",
    path: "/tasks",
    icon: <FaTasks />,
    color: "#2563eb",
  },
  {
    id: 2,
    title: "View Calendar",
    description: "Review upcoming deadlines and meetings.",
    action: "View",
    path: "/calendar",
    icon: <FaCalendarAlt />,
    color: "#10b981",
  },
  {
    id: 3,
    title: "Team Overview",
    description: "See what your team is working on.",
    action: "Open",
    path: "/team",
    icon: <FaUsers />,
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Analytics",
    description: "Dive into performance metrics.",
    action: "Explore",
    path: "/analytics",
    icon: null,
    color: "#8b5cf6",
  },
];

function DashboardQuickActions() {
  const navigate = useNavigate();

  return (
    <section className="dashboard-quick-actions">
      <header>
        <h2>Quick Actions</h2>
        <p>Access the most common actions from your dashboard</p>
      </header>

      <div className="quick-actions-grid">
        {quickActions.map((item, index) => (
          <motion.article
            key={item.id}
            className="quick-action-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -4 }}
            onClick={() => navigate(item.path)}
          >
            <h3>
              {item.icon && (
                <span style={{ color: item.color, marginRight: 8 }}>
                  {item.icon}
                </span>
              )}
              {item.title}
            </h3>
            <p>{item.description}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(item.path);
              }}
            >
              {item.action}
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default DashboardQuickActions;
