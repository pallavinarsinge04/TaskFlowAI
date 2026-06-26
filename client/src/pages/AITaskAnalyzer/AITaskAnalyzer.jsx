import "./Page.css";

function AITaskAnalyzer() {
  return (
    <div className="page-container">
      <h1>🤖 AI Task Analyzer</h1>

      <div className="page-card">
        <h3>Smart Task Analysis</h3>

        <p>
          AI analyzes task complexity, priority,
          deadlines, and estimated completion time.
        </p>

        <textarea
          placeholder="Enter your task..."
          rows="5"
        />

        <button>Analyze Task</button>
      </div>
    </div>
  );
}

export default AITaskAnalyzer;