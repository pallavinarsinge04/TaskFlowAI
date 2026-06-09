import { useState } from "react";

const AIAssistant = () => {

  const [task, setTask] = useState("");

  const [suggestion, setSuggestion] = useState("");

  const getSuggestion = () => {

    if (task.toLowerCase().includes("bug")) {
      setSuggestion("🔥 High Priority - Fix immediately");
    }
    else if (task.toLowerCase().includes("ui")) {
      setSuggestion("⭐ Medium Priority - UI Improvement");
    }
    else {
      setSuggestion("✅ Low Priority - Schedule later");
    }

  };

  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-4">

        🤖 AI Task Assistant

      </h2>

      <input

        type="text"

        placeholder="Enter task title"

        value={task}

        onChange={(e)=>setTask(e.target.value)}

        className="w-full border p-3 rounded-lg"

      />

      <button

        onClick={getSuggestion}

        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"

      >

        Get AI Suggestion

      </button>

      {suggestion &&

      <div className="mt-5 p-4 bg-blue-100 rounded-lg">

        {suggestion}

      </div>

      }

    </div>

  );

};

export default AIAssistant;