import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { supabase } from "../../supabase/supabaseClient";

const API_URL = "http://localhost:5000/api";

const statusColors = {
  Online: "#22c55e",
  Away: "#f59e0b",
  Busy: "#ef4444",
  Offline: "#94a3b8",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function DashboardTeam() {
  const navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================================
  // AUTH HEADERS
  // =========================================

  const getAuthHeaders = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("Authentication session not found.");
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
    };
  };

  // =========================================
  // LOAD PROJECTS
  // =========================================

  const loadProjects = async () => {
    try {
      const headers = await getAuthHeaders();

      const response = await axios.get(
        `${API_URL}/projects`,
        { headers }
      );

      const projectList = response.data?.projects || [];

      setProjects(projectList);

      if (projectList.length > 0 && !selectedProjectId) {
        setSelectedProjectId(projectList[0].id);
      }
    } catch (error) {
      console.error(
        "Dashboard projects error:",
        error.response?.data || error.message
      );
    }
  };

  // =========================================
  // LOAD TEAM MEMBERS
  // =========================================

  const loadTeamMembers = async (projectId) => {
    if (!projectId) {
      setTeamMembers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const headers = await getAuthHeaders();

      const response = await axios.get(
        `${API_URL}/team/project/${projectId}`,
        { headers }
      );

      setTeamMembers(response.data?.members || []);
    } catch (error) {
      console.error(
        "Dashboard team error:",
        error.response?.data || error.message
      );

      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {
    loadProjects();
  }, []);

  // =========================================
  // LOAD MEMBERS WHEN PROJECT CHANGES
  // =========================================

  useEffect(() => {
    if (selectedProjectId) {
      loadTeamMembers(selectedProjectId);
    }
  }, [selectedProjectId]);

  // =========================================
  // REALTIME TEAM UPDATES
  // =========================================

  useEffect(() => {
    if (!selectedProjectId) return;

    let channel = null;
    let mounted = true;

    const setupRealtime = async () => {
      channel = supabase
        .channel(
          `dashboard-team-project-${selectedProjectId}`
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "team_members",
            filter: `project_id=eq.${selectedProjectId}`,
          },
          () => {
            if (mounted) {
              loadTeamMembers(selectedProjectId);
            }
          }
        );

      await channel.subscribe();
    };

    setupRealtime();

    return () => {
      mounted = false;

      if (channel) {
        supabase.removeChannel(channel);
        channel = null;
      }
    };
  }, [selectedProjectId]);

  // =========================================
  // TEAM STATISTICS
  // =========================================

  const activeCount = teamMembers.filter(
    (member) =>
      member.status === "Online" ||
      member.status === "Busy"
  ).length;

  const onlineCount = teamMembers.filter(
    (member) => member.status === "Online"
  ).length;

  // =========================================
  // UI
  // =========================================

  return (
    <section className="dashboard-widget team-widget">

      {/* HEADER */}

      <div className="widget-header">
        <div>
          <h2>Team</h2>

          <p>
            Members, roles, and live status
          </p>
        </div>

        <button
          type="button"
          className="widget-link-btn"
          onClick={() => navigate("/team")}
        >
          Manage
        </button>
      </div>

      {/* PROJECT SELECTOR */}

      {projects.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <select
            value={selectedProjectId}
            onChange={(event) =>
              setSelectedProjectId(event.target.value)
            }
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* STATS */}

      <div className="team-stats">

        <div className="team-stat">
          <div className="team-stat-label">
            Total
          </div>

          <div className="team-stat-value">
            {loading ? "..." : teamMembers.length}
          </div>
        </div>

        <div className="team-stat">
          <div className="team-stat-label">
            Active
          </div>

          <div className="team-stat-value">
            {loading ? "..." : activeCount}
          </div>
        </div>

        <div className="team-stat">
          <div className="team-stat-label">
            Online
          </div>

          <div className="team-stat-value">
            {loading ? "..." : onlineCount}
          </div>
        </div>

      </div>

      {/* MEMBERS */}

      <div className="team-members-list">

        {loading ? (
          <div className="team-loading">
            Loading team members...
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="team-empty">

            <p>
              No team members in this project yet.
            </p>

            <button
              type="button"
              className="widget-link-btn"
              onClick={() => navigate("/team")}
            >
              Add Member
            </button>

          </div>
        ) : (
          teamMembers.map((member, index) => {

            const status =
              member.status || "Offline";

            const initials =
              getInitials(member.name);

            return (
              <motion.div
                key={member.id}
                className="team-member-row"
                initial={{
                  opacity: 0,
                  x: 10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.06,
                }}
                whileHover={{
                  x: 4,
                }}
                onClick={() =>
                  navigate("/team")
                }
                style={{
                  cursor: "pointer",
                }}
              >

                {/* AVATAR */}

                <div
                  className="team-avatar"
                  style={{
                    background: "#2563eb",
                  }}
                >
                  {member.profile_image ? (
                    <img
                      src={member.profile_image}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "inherit",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    initials
                  )}
                </div>

                {/* INFO */}

                <div className="team-member-info">

                  <div className="team-member-name">
                    {member.name || "Team Member"}
                  </div>

                  <div className="team-member-role">
                    {member.role || "member"}
                  </div>

                </div>

                {/* STATUS */}

                <span className="team-status-badge">

                  <span
                    className="team-status-dot"
                    style={{
                      background:
                        statusColors[status] ||
                        "#94a3b8",
                    }}
                  />

                  {status}

                </span>

              </motion.div>
            );
          })
        )}

      </div>

    </section>
  );
}

export default DashboardTeam;