import "./RecentTasks.css";

function RecentTasks() {
  const tasks = [
    {
      title: "Design Dashboard UI",
      priority: "High",
      status: "Completed",
      due: "Today",
      assignee: "PN",
    },
    {
      title: "Develop Authentication",
      priority: "Medium",
      status: "In Progress",
      due: "Tomorrow",
      assignee: "AS",
    },
    {
      title: "Integrate AI Assistant",
      priority: "High",
      status: "Pending",
      due: "29 Jun",
      assignee: "RK",
    },
    {
      title: "Fix Project Bugs",
      priority: "Low",
      status: "Completed",
      due: "30 Jun",
      assignee: "SK",
    },
    {
      title: "Deploy on Render",
      priority: "High",
      status: "In Progress",
      due: "2 Jul",
      assignee: "PN",
    },
  ];

  return (
    <div className="recent-tasks">

      <div className="tasks-header">

        <h2>📝 Recent Tasks</h2>

        <button>View All</button>

      </div>

      <table>

        <thead>

          <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Assignee</th>
          </tr>

        </thead>

        <tbody>

          {tasks.map((task, index) => (

            <tr key={index}>

              <td>{task.title}</td>

              <td>

                <span
                  className={`priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

              </td>

              <td>

                <span
                  className={`status ${task.status
                    .replace(" ", "")
                    .toLowerCase()}`}
                >
                  {task.status}
                </span>

              </td>

              <td>{task.due}</td>

              <td>

                <div className="avatar">
                  {task.assignee}
                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentTasks;