import "./ProjectProgress.css";

function ProjectProgress() {
  const projects = [
    {
      name: "TaskFlow AI",
      progress: 92,
    },
    {
      name: "AI Ecommerce",
      progress: 74,
    },
    {
      name: "Attendance App",
      progress: 58,
    },
    {
      name: "Portfolio Website",
      progress: 100,
    },
  ];

  return (
    <div className="project-progress-card">
      <h2>📁 Project Progress</h2>

      {projects.map((project, index) => (
        <div className="project-item" key={index}>
          <div className="project-header">
            <span>{project.name}</span>
            <span>{project.progress}%</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectProgress;