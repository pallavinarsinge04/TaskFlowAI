import React from "react";
import "./DashboardCharts.css";

function DashboardCharts({ projects = [] }) {
  return (
    <div className="dashboard-charts">
      <h3>Recent Projects</h3>
      <ul>
        {projects && projects.length > 0 ? (
          projects.map((p) => (
            <li key={p.id || p.name} className="project-item">
              <strong>{p.name}</strong>
              {p.progress !== undefined && (
                <span className="project-progress"> — {p.progress}%</span>
              )}
            </li>
          ))
        ) : (
          <li className="no-project">No recent projects</li>
        )}
      </ul>
    </div>
  );
}

export default DashboardCharts;
