import {
  FaCode,
  FaBug,
  FaRocket,
  FaTasks,
  FaChartBar,
  FaLightbulb,
  FaDatabase,
  FaRobot,
} from "react-icons/fa";

const prompts = [
  {
    icon: <FaRocket />,
    title: "Generate Roadmap",
    prompt: "Generate a complete roadmap for my project.",
  },
  {
    icon: <FaCode />,
    title: "Write Code",
    prompt: "Write production-ready React code.",
  },
  {
    icon: <FaBug />,
    title: "Debug Error",
    prompt: "Help me fix my React application error.",
  },
  {
    icon: <FaTasks />,
    title: "Task Planning",
    prompt: "Create today's task plan.",
  },
  {
    icon: <FaChartBar />,
    title: "Analytics",
    prompt: "Show my project analytics.",
  },
  {
    icon: <FaDatabase />,
    title: "Database",
    prompt: "Design a MongoDB schema for my project.",
  },
  {
    icon: <FaLightbulb />,
    title: "Project Ideas",
    prompt: "Suggest some final year project ideas.",
  },
  {
    icon: <FaRobot />,
    title: "AI Assistant",
    prompt: "Explain today's AI trends.",
  },
];

function SuggestedPrompts({ onSelect }) {
  return (
    <div className="prompt-container">
      <h3 className="prompt-title">
        💡 Suggested Prompts
      </h3>

      <div className="prompt-grid">
        {prompts.map((item, index) => (
          <button
            key={index}
            className="prompt-card"
            onClick={() => onSelect(item.prompt)}
          >
            <div className="prompt-icon">
              {item.icon}
            </div>

            <div className="prompt-info">
              <h4>{item.title}</h4>
              <p>{item.prompt}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SuggestedPrompts;