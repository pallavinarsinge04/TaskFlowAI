import "./Projects.css";

function Projects() {
  const projects = [
    {
      title: "TaskFlow AI",
      status: "In Progress",
      progress: 85,
    },
    {
      title: "Smart AI Ecommerce",
      status: "Completed",
      progress: 100,
    },
    {
      title: "Student Attendance App",
      status: "In Progress",
      progress: 70,
    },
    {
      title: "Flashcard Quiz App",
      status: "Planning",
      progress: 30,
    },
  ];

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Projects Dashboard</h1>
        <button>Add Project</button>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h2>{project.title}</h2>
            <p>Status: {project.status}</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>

            <span>{project.progress}% Complete</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;