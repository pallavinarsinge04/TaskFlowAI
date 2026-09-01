import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../supabase/supabaseClient";

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
  const [loading, setLoading] = useState(true);

  // =========================================
  // LOAD TEAM MEMBERS
  // =========================================

  useEffect(() => {
    let channel;

    const loadTeamMembers = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setTeamMembers([]);
          return;
        }

        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

        if (error) throw error;

        setTeamMembers(data || []);

        // =========================================
        // REAL-TIME TEAM UPDATES
        // =========================================

        channel = supabase
          .channel(`dashboard-team-${user.id}`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "team_members",
              filter: `user_id=eq.${user.id}`,
            },
            () => {
              loadTeamMembers();
            }
          )
          .subscribe();
      } catch (error) {
        console.error("Dashboard team error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

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
            <p>No team members yet.</p>

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
              >

                {/* AVATAR */}

                <div
                  className="team-avatar"
                  style={{
                    background:
                      "#2563eb",
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
                    {member.name}
                  </div>

                  <div className="team-member-role">
                    {member.role}
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