import { useState } from "react";
import axios from "axios";

const AITaskAnalyzer = () => {
  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [result, setResult] =
    useState("");

  const analyze = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/ai/analyze",
      {
        title,
        description,
      }
    );

    setResult(res.data.result);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-5">

        🤖 AI Task Analyzer

      </h1>

      <input
        className="border p-3 w-full mb-3"
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="border p-3 w-full"
        rows="5"
        placeholder="Task Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button
        onClick={analyze}
        className="bg-blue-600 text-white px-5 py-3 mt-4 rounded"
      >
        Analyze Task
      </button>

      {result && (
        <div className="mt-5 bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {result}
        </div>
      )}

    </div>
  );
};

export default AITaskAnalyzer;