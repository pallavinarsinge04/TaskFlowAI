import "./TeamPage.css";
import { useEffect, useState } from "react";
import { FaUserCircle, FaPlus } from "react-icons/fa";

function TeamPage() {

  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);

    // demo team data
    const demoTeam = [
      {
        id: 1,
        name: "Pallavi",
        role: "Admin",
        status: "Online"
      },
      {
        id: 2,
        name: "Amit",
        role: "Developer",
        status: "Offline"
      },
      {
        id: 3,
        name: "Neha",
        role: "Designer",
        status: "Online"
      }
    ];

    setTeam(demoTeam);

  }, []);

  const getTaskCount = (name) => {
    return tasks.filter(t => t.assignee === name).length;
  };

  return (

    <div className="team-container">

      {/* HEADER */}
      <div className="team-header">

        <div>
          <h1>👥 Team Management</h1>
          <p>Manage your project team & workload</p>
        </div>

        <button className="add-member">
          <FaPlus /> Add Member
        </button>

      </div>

      {/* TEAM GRID */}
      <div className="team-grid">

        {team.map(member => (

          <div className="team-card" key={member.id}>

            <FaUserCircle className="avatar" />

            <h2>{member.name}</h2>

            <span className={`role ${member.role}`}>
              {member.role}
            </span>

            <span className={`status ${member.status}`}>
              {member.status}
            </span>

            <div className="task-info">
              Tasks: {getTaskCount(member.name)}
            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default TeamPage;