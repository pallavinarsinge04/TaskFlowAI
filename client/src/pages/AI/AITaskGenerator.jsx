import { useState } from "react";
import axios from "axios";

function AITaskGenerator() {

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);

  const generateTask = async () => {

    const res = await axios.post("http://localhost:5000/api/ai/generate-task", {
      prompt
    });

    setResult(res.data);
  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>🤖 AI Task Generator</h1>

      <textarea
        rows="5"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your project..."
      />

      <br />

      <button onClick={generateTask}>
        Generate Task
      </button>

      {result && (
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

    </div>

  );

}

export default AITaskGenerator;