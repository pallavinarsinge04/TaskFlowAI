import { useState } from "react";
import "./AIInsights.css";
import {
  FaRobot,
  FaBrain,
  FaLightbulb,
  FaArrowTrendUp,
  FaShieldHeart,
  FaCircleCheck,
  FaCopy,
  FaTrash
} from "react-icons/fa6";

function AIInsights() {

  const aiData = [
    [
      "Complete Authentication Module today.",
      "Assign Backend API tasks.",
      "Project productivity increased by 15%.",
      "No deadline risks detected.",
      "Schedule meeting tomorrow at 10 AM."
    ],
    [
      "Finish Dashboard UI before Friday.",
      "Resolve 4 pending bugs.",
      "Increase testing coverage.",
      "Backend performance looks excellent.",
      "Review Project Documentation."
    ],
    [
      "Frontend team completed 92% work.",
      "Deploy staging server.",
      "Create database backup.",
      "Project health is Outstanding.",
      "Notify QA Team for testing."
    ]
  ];

  const [loading, setLoading] = useState(false);

  const [confidence, setConfidence] = useState(96);

  const [health, setHealth] = useState("Excellent");

  const [lastUpdate, setLastUpdate] = useState(
    new Date().toLocaleTimeString()
  );

  const [suggestions, setSuggestions] = useState(aiData[0]);

  const refreshAI = () => {

    setLoading(true);

    setTimeout(() => {

      const random =
        Math.floor(Math.random() * aiData.length);

      setSuggestions(aiData[random]);

      setConfidence(
        Math.floor(Math.random() * 10) + 90
      );

      const healths = [
        "Excellent",
        "Very Good",
        "Good"
      ];

      setHealth(
        healths[
          Math.floor(Math.random() * healths.length)
        ]
      );

      setLastUpdate(
        new Date().toLocaleTimeString()
      );

      setLoading(false);

    }, 1500);

  };

  const removeSuggestion = (index) => {

    setSuggestions(
      suggestions.filter((_, i) => i !== index)
    );

  };

  const copyInsights = () => {

    navigator.clipboard.writeText(
      suggestions.join("\n")
    );

    alert("AI Insights copied.");

  };

  const clearAll = () => {

    setSuggestions([]);

  };

  return (

    <div className="ai-card">

      <div className="ai-header">

        <div>

          <h2>

            <FaRobot />

            AI Insights

          </h2>

          <p>

            Smart recommendations powered by AI

          </p>

        </div>

        <button
          onClick={refreshAI}
        >
          {loading ? "Thinking..." : "Refresh AI"}
        </button>

      </div>

      <div className="ai-stats">

        <div className="insight-box">

          <FaBrain className="icon purple"/>

          <h4>AI Confidence</h4>

          <h2>{confidence}%</h2>

        </div>

        <div className="insight-box">

          <FaShieldHeart className="icon green"/>

          <h4>Project Health</h4>

          <h2>{health}</h2>

        </div>

        <div className="insight-box">

          <FaArrowTrendUp className="icon blue"/>

          <h4>Last Update</h4>

          <h2>{lastUpdate}</h2>

        </div>

      </div>

      <div className="recommendations">

        <div
          style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:"15px"
          }}
        >

          <h3>

            <FaLightbulb />

            AI Recommendations

          </h3>

          <div>

            <button
              className="small-btn"
              onClick={copyInsights}
            >

              <FaCopy />

            </button>

            <button
              className="small-btn delete"
              onClick={clearAll}
            >

              <FaTrash />

            </button>

          </div>

        </div>

        {

          loading ?

          <div
            style={{
              textAlign:"center",
              padding:"40px"
            }}
          >

            🤖 AI is analyzing your project...

          </div>

          :

          suggestions.length===0 ?

          <div
            style={{
              textAlign:"center",
              padding:"30px"
            }}
          >

            No AI Suggestions

          </div>

          :

          suggestions.map((item,index)=>(

            <div
              className="recommendation"
              key={index}
            >

              <div
                style={{
                  display:"flex",
                  alignItems:"center",
                  gap:"12px"
                }}
              >

                <FaCircleCheck className="check"/>

                <span>{item}</span>

              </div>

              <button

                className="done-btn"

                onClick={()=>
                  removeSuggestion(index)
                }

              >

                Done

              </button>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default AIInsights;