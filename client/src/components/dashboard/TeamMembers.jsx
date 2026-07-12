import { useEffect, useState } from "react";
import "./TeamMembers.css";
import {
  FaCircle,
  FaEnvelope,
  FaPhone,
  FaUsers,
} from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";

function TeamMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setMembers(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onlineCount = members.filter(
    (m) => m.status === "Online"
  ).length;

  const offlineCount = members.length - onlineCount;

  return (
    <div className="team-members">
      <div className="team-header">
        <div>
          <h2>
            <FaUsers />
            Team Members
          </h2>

          <p>Project Collaboration</p>
        </div>

        <button className="view-btn">
          View All
        </button>
      </div>

      <div className="team-list">
        {loading ? (
          <p>Loading...</p>
        ) : members.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#777",
            }}
          >
            No Team Members Found
          </div>
        ) : (
          members.map((member) => (
            <div className="team-card" key={member.id}>
              <img
                src={
                  member.profile_image ||
                  "https://i.pravatar.cc/150?img=12"
                }
                alt={member.name}
              />

              <div className="member-info">
                <h3>{member.name}</h3>

                <p>{member.role}</p>

                <span
                  className={(
                    member.status || "Offline"
                  ).toLowerCase()}
                >
                  <FaCircle />

                  {member.status || "Offline"}
                </span>
              </div>

              <div className="member-actions">
                <button>
                  <FaEnvelope />
                </button>

                <button>
                  <FaPhone />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="team-footer">
        <div>
          <h3>{members.length}</h3>
          <p>Total Members</p>
        </div>

        <div>
          <h3>{onlineCount}</h3>
          <p>Online</p>
        </div>

        <div>
          <h3>{offlineCount}</h3>
          <p>Offline</p>
        </div>
      </div>
    </div>
  );
}

export default TeamMembers;