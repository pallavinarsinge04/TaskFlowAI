import { useState } from "react";
import axios from "axios";

const AIAssistant = () => {
  const [task, setTask] = useState("");
  const [result, setResult] = useState("");

  const generateSuggestion = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/suggest",
        {
          task,
        }
      );

      setResult(res.data.suggestion);
    } catch (error) {
      setResult("Unable to generate AI suggestion.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Task Assistant
      </h2>

      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full border rounded-lg p-3"
      />

      <button
        onClick={generateSuggestion}
        className="mt-4 px-6 py-3 rounded-lg bg-blue-600 text-white"
      >
        Generate AI Suggestion
      </button>

      {result && (
        <div className="mt-6 p-4 rounded-lg bg-blue-100">
          <h3 className="font-bold">
            Suggested Priority:
          </h3>

          <p className="text-xl">{result}</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;