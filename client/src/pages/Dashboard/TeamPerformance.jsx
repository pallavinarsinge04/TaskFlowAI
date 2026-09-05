import React from "react";
import {
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTasks,
} from "react-icons/fa";

import "./TeamPerformance.css";

const TeamPerformance = ({ members = [] }) => {
  const sortedMembers = [...members].sort(
    (a, b) => b.completionRate - a.completionRate
  );

  return (
    <section className="team-performance">

      <div className="team-performance-header">
        <div>
          <h3>
            <FaUsers />
            Team Performance
          </h3>

          <p>
            Workload and completion performance
          </p>
        </div>

        <span className="team-member-count">
          {members.length} members
        </span>
      </div>

      {sortedMembers.length === 0 ? (
        <div className="team-empty">
          <FaUsers />
          <p>No team performance data available.</p>
        </div>
      ) : (
        <div className="team-performance-list">

          {sortedMembers.map((member, index) => (

            <div
              className="team-performance-item"
              key={member.id || member.user_id || index}
            >

              <div className="member-avatar">
                {member.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}
              </div>

              <div className="member-main">

                <div className="member-heading">

                  <div>
                    <strong>
                      {member.name}
                    </strong>

                    <span>
                      {member.role}
                    </span>
                  </div>

                  <strong className="completion-rate">
                    {member.completionRate}%
                  </strong>

                </div>

                <div className="member-progress">

                  <div
                    className="member-progress-fill"
                    style={{
                      width: `${member.completionRate}%`,
                    }}
                  />

                </div>

                <div className="member-stats">

                  <span>
                    <FaTasks />
                    {member.totalTasks} tasks
                  </span>

                  <span>
                    <FaCheckCircle />
                    {member.completedTasks} completed
                  </span>

                  {member.overdueTasks > 0 && (
                    <span className="member-overdue">
                      <FaExclamationTriangle />
                      {member.overdueTasks} overdue
                    </span>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
};

export default TeamPerformance;