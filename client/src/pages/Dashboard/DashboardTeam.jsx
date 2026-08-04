import React from "react";

function DashboardTeam({ teamMembers = [] }) {
  // Adjust predicate if your member objects use different property names
  const activeTodayCount = teamMembers.filter((m) => m.active).length;

  return (
    <div className="team-card" style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ margin: 0, color: "#6b7280" }}>Team</p>
          <p style={{ margin: "12px 0 0", fontSize: "2rem", fontWeight: 700 }}>{teamMembers.length}</p>
        </div>

        <div style={{ background: "#ffffff", borderRadius: 18, padding: 22, boxShadow: "0 12px 30px rgba(15,23,42,0.06)" }}>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "0.85rem" }}>Active today</p>
          <p style={{ margin: "12px 0 0", fontSize: "2rem", fontWeight: 700 }}>{activeTodayCount}</p>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        {teamMembers.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No team members</p>
        ) : (
          <ul style={{ paddingLeft: 16 }}>
            {teamMembers.slice(0, 8).map((m) => (
              <li key={m.id || m.email || m.name} style={{ marginBottom: 8 }}>
                <strong>{m.name || m.email}</strong> <span style={{ color: "#6b7280" }}> — {m.role || "Member"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardTeam;
