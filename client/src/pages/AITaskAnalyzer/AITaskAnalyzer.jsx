import { useState } from "react";
import axios from "axios";

function AITaskAnalyzer() {
  const [task, setTask] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeTask = async () => {
    if (!task.trim()) {
      alert("Please enter a task.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/suggest",
        {
          task,
        }
      );

      const priority = res.data.suggestion;

      let estimatedTime = "1 Hour";
      let difficulty = "Easy";

      if (priority === "Medium") {
        estimatedTime = "3 Hours";
        difficulty = "Medium";
      }

      if (priority === "High") {
        estimatedTime = "6 Hours";
        difficulty = "Hard";
      }

      setAnalysis({
        priority,
        estimatedTime,
        difficulty,
      });
    } catch (error) {
      console.log(error);

      alert("AI Analysis Failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
          🤖 AI Task Analyzer
        </h1>

        <textarea
          rows="6"
          className="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your task description..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          onClick={analyzeTask}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Analyzing..." : "Analyze Task"}
        </button>

        {analysis && (
          <div className="mt-8">

            <h2 className="text-2xl font-bold mb-4">
              AI Analysis Result
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div className="bg-green-100 p-5 rounded-lg shadow">

                <h3 className="font-bold text-lg">
                  Priority
                </h3>

                <p className="text-2xl mt-2">
                  {analysis.priority}
                </p>

              </div>

              <div className="bg-yellow-100 p-5 rounded-lg shadow">

                <h3 className="font-bold text-lg">
                  Estimated Time
                </h3>

                <p className="text-2xl mt-2">
                  {analysis.estimatedTime}
                </p>

              </div>

              <div className="bg-blue-100 p-5 rounded-lg shadow">

                <h3 className="font-bold text-lg">
                  Difficulty
                </h3>

                <p className="text-2xl mt-2">
                  {analysis.difficulty}
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default AITaskAnalyzer;