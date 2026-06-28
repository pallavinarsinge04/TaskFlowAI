import { useEffect, useState } from "react";
import "./Labels.css";

function Labels({ taskId }) {

  const storageKey = `labels_${taskId}`;

  const [labels, setLabels] = useState([]);

  const [input, setInput] = useState("");

  const colors = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#f59e0b",
    "#7c3aed",
    "#0ea5e9"
  ];

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    setLabels(saved);

  }, [storageKey]);

  useEffect(() => {

    localStorage.setItem(
      storageKey,
      JSON.stringify(labels)
    );

  }, [labels, storageKey]);

  const addLabel = () => {

    if (!input.trim()) return;

    const newLabel = {

      id: Date.now(),

      name: input,

      color: colors[
        Math.floor(Math.random() * colors.length)
      ]

    };

    setLabels([...labels, newLabel]);

    setInput("");

  };

  const removeLabel = (id) => {

    setLabels(
      labels.filter(label => label.id !== id)
    );

  };

  return (

    <div className="labels-container">

      <h2>🏷 Labels</h2>

      <div className="label-input">

        <input
          type="text"
          placeholder="Add label..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={addLabel}>
          Add
        </button>

      </div>

      <div className="labels-list">

        {labels.length === 0 && (
          <p>No labels added</p>
        )}

        {labels.map(label => (

          <div
            key={label.id}
            className="label-item"
            style={{
              backgroundColor: label.color
            }}
          >

            <span>{label.name}</span>

            <button onClick={() => removeLabel(label.id)}>
              ✕
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Labels;