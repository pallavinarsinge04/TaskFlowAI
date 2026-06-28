import "./AIInsights.css";
import {
  FaRobot,
  FaBrain,
  FaLightbulb,
  FaArrowTrendUp,
  FaShieldHeart,
  FaCircleCheck
} from "react-icons/fa6";

function AIInsights() {

  const suggestions = [
    "Complete 'Authentication Module' today.",
    "Assign 2 pending tasks to Backend Team.",
    "Project productivity increased by 12% this week.",
    "No deadline risks detected.",
    "AI recommends scheduling tomorrow's meeting at 10:00 AM."
  ];

  return (
    <div className="ai-card">

      <div className="ai-header">

        <div>
          <h2>
            <FaRobot />
            AI Insights
          </h2>

          <p>Smart recommendations powered by AI</p>
        </div>

        <button>Refresh AI</button>

      </div>

      <div className="ai-stats">

        <div className="insight-box">

          <FaBrain className="icon purple"/>

          <h4>AI Score</h4>

          <h2>96%</h2>

        </div>

        <div className="insight-box">

          <FaShieldHeart className="icon green"/>

          <h4>Project Health</h4>

          <h2>Excellent</h2>

        </div>

        <div className="insight-box">

          <FaArrowTrendUp className="icon blue"/>

          <h4>Weekly Growth</h4>

          <h2>+14%</h2>

        </div>

      </div>

      <div className="recommendations">

        <h3>
          <FaLightbulb />
          AI Recommendations
        </h3>

        {suggestions.map((item,index)=>(

          <div
            className="recommendation"
            key={index}
          >

            <FaCircleCheck className="check"/>

            <span>{item}</span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AIInsights;