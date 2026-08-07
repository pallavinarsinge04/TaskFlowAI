import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LineChartCard from "./components/LineChartCard";
import PieChartCard from "./components/PieChartCard";

const statusColors = {
  Active: "#2563eb",
  Planning: "#f59e0b",
  Completed: "#10b981",
};

const priorityColors = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#64748b",
};

function DashboardCharts({ projects = [] }) {
  const navigate = useNavigate();

  return (
    <section className="dashboard-widget dashboard-charts-section">
      <div className="widget-header">
        <div>
          <h2>Analytics & Projects</h2>
          <p>Track productivity trends and active project progress</p>
        </div>
        <button
          type="button"
          className="widget-link-btn"
          onClick={() => navigate("/analytics")}
        >
          View Analytics
        </button>
      </div>

      <div className="charts-grid">
        <LineChartCard />
        <PieChartCard />
      </div>

      <div className="projects-panel">
        <div className="projects-panel-header">
          <h3>Recent Projects</h3>
          <button
            type="button"
            className="widget-link-btn"
            onClick={() => navigate("/projects")}
          >
            See all
          </button>
        </div>

        <ul className="projects-list">
          {projects.map((project, index) => (
            <motion.li
              key={project.id}
              className="project-item"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <div className="project-item-top">
                <strong>{project.name}</strong>
                <span
                  className="project-badge"
                  style={{
                    background: `${statusColors[project.status] || "#64748b"}18`,
                    color: statusColors[project.status] || "#64748b",
                  }}
                >
                  {project.status}
                </span>
              </div>

              <div className="project-progress-row">
                <div className="project-progress-track">
                  <motion.div
                    className="project-progress-fill"
                    style={{
                      background: statusColors[project.status] || "#2563eb",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1.2, delay: index * 0.1 }}
                  />
                </div>
                <span>{project.progress}%</span>
              </div>

              <span
                className="project-priority"
                style={{ color: priorityColors[project.priority] || "#64748b" }}
              >
                {project.priority} priority
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DashboardCharts;
