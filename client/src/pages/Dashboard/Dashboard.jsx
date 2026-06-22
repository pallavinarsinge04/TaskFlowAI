import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    productivity: 0,
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (!user) return;

    axios
      .get(
        `http://localhost:5000/api/dashboard/${user._id}`
      )
      .then((res) => {
        setStats(res.data.stats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="dashboard-container">

      <h1>Dashboard</h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Projects</h3>
          <h1>{stats.totalProjects}</h1>
        </div>

        <div className="dashboard-card">
          <h3>Total Tasks</h3>
          <h1>{stats.totalTasks}</h1>
        </div>

        <div className="dashboard-card">
          <h3>Completed Tasks</h3>
          <h1>{stats.completedTasks}</h1>
        </div>

        <div className="dashboard-card">
          <h3>Productivity</h3>
          <h1>{stats.productivity}%</h1>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;