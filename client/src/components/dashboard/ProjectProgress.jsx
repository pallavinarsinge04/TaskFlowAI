import "./ProjectProgress.css";

function ProjectProgress() {
  const projects = [
    {
      name: "TaskFlow AI",
      progress: 92,
      status: "On Track",
      due: "28 Jun",
      members: 6,
    },
    {
      name: "Smart AI Ecommerce",
      progress: 74,
      status: "In Progress",
      due: "05 Jul",
      members: 4,
    },
    {
      name: "Student Attendance",
      progress: 58,
      status: "Pending",
      due: "12 Jul",
      members: 3,
    },
    {
      name: "Flashcard Quiz App",
      progress: 100,
      status: "Completed",
      due: "Completed",
      members: 2,
    },
  ];

  return (
    <div className="project-progress">

      <div className="project-header">

        <h2>📁 Project Progress</h2>

        <button>View All</button>

      </div>

      {projects.map((project, index) => (

        <div className="project-card" key={index}>

          <div className="project-top">

            <div>

              <h3>{project.name}</h3>

              <p>{project.members} Team Members</p>

            </div>

            <span
              className={`status ${
                project.status
                  .replace(" ", "")
                  .toLowerCase()
              }`}
            >
              {project.status}
            </span>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${project.progress}%`,
              }}
            ></div>

          </div>

          <div className="project-bottom">

            <span>{project.progress}% Complete</span>

            <span>Due : {project.due}</span>

          </div>

        </div>

      ))}

    </div>
  );
}

export default ProjectProgress;