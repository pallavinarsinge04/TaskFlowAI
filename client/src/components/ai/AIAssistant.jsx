import { useState } from "react";
import axios from "axios";

const AIAssistant = () => {
  const [task, setTask] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const getSuggestion = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/suggest",
        {
          task,
        }
      );

      setSuggestion(res.data.suggestion);
    } catch (error) {
      console.log(error);

      setSuggestion("Unable to generate AI suggestion.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-3xl font-bold mb-5">
        🤖 AI Task Assistant
      </h2>

      <input
        type="text"
        placeholder="Enter task title..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

      <button
        onClick={getSuggestion}
        className="mt-5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition"
      >
        Generate AI Suggestion
      </button>

      {suggestion && (
        <div className="mt-6 bg-blue-100 p-4 rounded-lg text-xl font-semibold">
          💡 {suggestion}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;