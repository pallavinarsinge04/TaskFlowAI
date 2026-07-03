import "./StatsCards.css";
import {
  FaFolderOpen,
  FaTasks,
  FaUsers,
  FaChartLine
} from "react-icons/fa";

function StatsCards() {

  const stats = [
    {
      title: "Projects",
      value: 18,
      icon: <FaFolderOpen />,
      color: "#2563eb",
      growth: "+12%"
    },
    {
      title: "Tasks",
      value: 148,
      icon: <FaTasks />,
      color: "#10b981",
      growth: "+21%"
    },
    {
      title: "Team Members",
      value: 26,
      icon: <FaUsers />,
      color: "#f59e0b",
      growth: "+8%"
    },
    {
      title: "Productivity",
      value: "94%",
      icon: <FaChartLine />,
      color: "#7c3aed",
      growth: "+15%"
    }
  ];

  return (

    <div className="stats-grid">

      {stats.map((item,index)=>(

        <div
          key={index}
          className="stats-card"
        >

          <div
            className="stats-icon"
            style={{
              background:item.color
            }}
          >

            {item.icon}

          </div>

          <div className="stats-info">

            <h2>{item.value}</h2>

            <p>{item.title}</p>

            <span>{item.growth} this month</span>

          </div>

        </div>

      ))}

    </div>

  );

}

export default StatsCards;