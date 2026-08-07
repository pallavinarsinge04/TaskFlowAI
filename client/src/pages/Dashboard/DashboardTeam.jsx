import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const teamMembers = [
  {
    id: 1,
    name: "Ava Johnson",
    role: "Product Manager",
    status: "Online",
    color: "#2563eb",
  },
  {
    id: 2,
    name: "Miguel Santos",
    role: "UI/UX Designer",
    status: "Away",
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Frontend Engineer",
    status: "Busy",
    color: "#10b981",
  },
  {
    id: 4,
    name: "Noah Kim",
    role: "Backend Engineer",
    status: "Offline",
    color: "#64748b",
  },
];

const statusColors = {
  Online: "#22c55e",
  Away: "#f59e0b",
  Busy: "#ef4444",
  Offline: "#94a3b8",
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function DashboardTeam() {
  const navigate = useNavigate();

  const activeCount = teamMembers.filter(
    (m) => m.status === "Online" || m.status === "Busy"
  ).length;

  const onlineCount = teamMembers.filter((m) => m.status === "Online").length;

  return (
    <section className="dashboard-widget dashboard-team">
      <div className="widget-header">
        <div>
          <h2>Team</h2>
          <p>Members, roles, and live status</p>
        </div>
        <button
          type="button"
          className="widget-link-btn"
          onClick={() => navigate("/team")}
        >
          Manage
        </button>
      </div>

      <div className="team-stats">
        <div className="team-stat">
          <div className="team-stat-label">Total</div>
          <div className="team-stat-value">{teamMembers.length}</div>
        </div>
        <div className="team-stat">
          <div className="team-stat-label">Active</div>
          <div className="team-stat-value">{activeCount}</div>
        </div>
        <div className="team-stat">
          <div className="team-stat-label">Online</div>
          <div className="team-stat-value">{onlineCount}</div>
        </div>
      </div>

      <div className="team-members-list">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            className="team-member-row"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ x: 4 }}
            onClick={() => navigate("/team")}
          >
            <div
              className="team-avatar"
              style={{ background: member.color }}
            >
              {getInitials(member.name)}
            </div>
            <div className="team-member-info">
              <div className="team-member-name">{member.name}</div>
              <div className="team-member-role">{member.role}</div>
            </div>
            <span className="team-status-badge">
              <span
                className="team-status-dot"
                style={{ background: statusColors[member.status] }}
              />
              {member.status}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default DashboardTeam;
