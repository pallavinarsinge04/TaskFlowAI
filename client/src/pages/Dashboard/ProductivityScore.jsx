import {
  FaRocket,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import "./ProductivityScore.css";

function ProductivityScore({ score = 0 }) {
  const safeScore = Math.max(
    0,
    Math.min(100, Number(score) || 0)
  );

  let label = "Needs improvement";
  let icon = <FaExclamationTriangle />;

  if (safeScore >= 80) {
    label = "Excellent";
    icon = <FaRocket />;
  } else if (safeScore >= 60) {
    label = "Good";
    icon = <FaCheckCircle />;
  }

  return (
    <section className="productivity-score-card">

      <div className="productivity-score-header">
        <div>
          <h2>Productivity Score</h2>

          <p>
            Based on your current task performance
          </p>
        </div>
      </div>

      <div className="productivity-score-content">

        <div
          className="productivity-score-ring"
          style={{
            "--score": `${safeScore * 3.6}deg`,
          }}
        >
          <div className="productivity-score-inner">
            <strong>{safeScore}%</strong>

            <span>Score</span>
          </div>
        </div>

        <div className="productivity-score-details">

          <div className="productivity-score-status">
            {icon}

            <strong>{label}</strong>
          </div>

          <p>
            Your score combines task completion,
            deadline performance and overdue tasks.
          </p>

        </div>

      </div>

    </section>
  );
}

export default ProductivityScore;