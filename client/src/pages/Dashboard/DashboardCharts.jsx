import {
  FaChartBar,
  FaCheckCircle,
  FaTasks,
} from "react-icons/fa";

import "./DashboardCharts.css";

function DashboardCharts({
  projects = [],
  loading = false,
}) {
  // =====================================================
  // SAFE PROJECT DATA
  // =====================================================

  const projectData = Array.isArray(projects)
    ? projects
    : [];

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (!loading && projectData.length === 0) {
    return (
      <section className="dashboard-chart-card">
        <div className="dashboard-chart-header">
          <div>
            <h2>Project Productivity</h2>

            <p>
              Task completion by project
            </p>
          </div>

          <div className="dashboard-chart-icon">
            <FaChartBar />
          </div>
        </div>

        <div className="dashboard-chart-empty">
          <FaTasks />

          <h3>No project data yet</h3>

          <p>
            Create projects and tasks to see
            productivity analytics here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-chart-card">

      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div className="dashboard-chart-header">

        <div>
          <h2>Project Productivity</h2>

          <p>
            Task completion by project
          </p>
        </div>

        <div className="dashboard-chart-icon">
          <FaChartBar />
        </div>

      </div>

      {/* ============================================= */}
      {/* PROJECT LIST */}
      {/* ============================================= */}

      <div className="project-productivity-list">

        {loading ? (
          <div className="dashboard-chart-loading">
            Loading analytics...
          </div>
        ) : (
          projectData.map((project) => {

            const completion =
              Number(
                project.completionRate
              ) || 0;

            return (
              <div
                className="project-productivity-item"
                key={project.id}
              >

                {/* PROJECT INFO */}

                <div className="project-productivity-info">

                  <div className="project-productivity-title">

                    <span>
                      {project.name ||
                        "Untitled Project"}
                    </span>

                    {completion === 100 && (
                      <FaCheckCircle
                        className="project-complete-icon"
                      />
                    )}

                  </div>

                  <small>
                    {project.completedTasks || 0}
                    {" / "}
                    {project.totalTasks || 0}
                    {" tasks completed"}
                  </small>

                </div>

                {/* PERCENTAGE */}

                <strong>
                  {completion}%
                </strong>

                {/* PROGRESS */}

                <div className="project-progress-track">

                  <div
                    className="project-progress-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        completion
                      )}%`,
                    }}
                  />

                </div>

              </div>
            );
          })
        )}

      </div>

    </section>
  );
}

export default DashboardCharts;