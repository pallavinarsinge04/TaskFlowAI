import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaBug,
  FaEnvelope,
  FaCode,
  FaFileAlt,
  FaRobot,
  FaLightbulb,
} from "react-icons/fa";

const prompts = [
  {
    icon: <FaReact />,
    title: "React",
    prompt: "Create a responsive React login page using React Hooks.",
    color: "#61DBFB",
  },
  {
    icon: <FaNodeJs />,
    title: "Node.js",
    prompt: "Create a REST API using Express.js.",
    color: "#3C873A",
  },
  {
    icon: <FaPython />,
    title: "Python",
    prompt: "Write a Python program to perform binary search.",
    color: "#FFD43B",
  },
  {
    icon: <FaDatabase />,
    title: "SQL",
    prompt: "Write an SQL query to find the highest salary employee.",
    color: "#0EA5E9",
  },
  {
    icon: <FaBug />,
    title: "Debug",
    prompt: "Help me debug my JavaScript code.",
    color: "#EF4444",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    prompt: "Write a professional leave application email.",
    color: "#F97316",
  },
  {
    icon: <FaFileAlt />,
    title: "Resume",
    prompt: "Generate an ATS-friendly software engineer resume.",
    color: "#8B5CF6",
  },
  {
    icon: <FaCode />,
    title: "DSA",
    prompt: "Explain the Merge Sort algorithm with code.",
    color: "#10B981",
  },
  {
    icon: <FaRobot />,
    title: "AI",
    prompt: "Explain Generative AI in simple words.",
    color: "#EC4899",
  },
  {
    icon: <FaLightbulb />,
    title: "Ideas",
    prompt: "Give me 10 final year project ideas using AI.",
    color: "#FACC15",
  },
];

function PromptCards({ onSelect }) {
  return (
    <div className="prompt-section">
      <h2>💡 Suggested Prompts</h2>

      <div className="prompt-grid">
        {prompts.map((item, index) => (
          <div
            key={index}
            className="prompt-card"
            onClick={() => onSelect(item.prompt)}
          >
            <div
              className="prompt-icon"
              style={{ color: item.color }}
            >
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromptCards;