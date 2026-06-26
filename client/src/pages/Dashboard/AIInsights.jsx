import "./AIInsights.css";

function AIInsights() {
  return (
    <div className="dashboard-card">
      <h2>🤖 AI Insights</h2>

      <div className="insight-item">
        <h4>Task Prediction</h4>
        <p>AI predicts 6 tasks may miss their deadline.</p>
      </div>

      <div className="insight-item">
        <h4>Productivity</h4>
        <p>Your productivity increased by 12% this week.</p>
      </div>

      <div className="insight-item">
        <h4>Suggestion</h4>
        <p>Complete high-priority tasks before 4 PM for better efficiency.</p>
      </div>
    </div>
  );
}

export default AIInsights;