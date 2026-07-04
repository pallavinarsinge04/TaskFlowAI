import {
  FaCheck,
  FaTrash,
  FaCalendarAlt,
  FaFlag,
} from "react-icons/fa";
import { format } from "date-fns";
import { supabase } from "../../supabase/supabaseClient";
import { updateProjectProgress } from "./../../utils/updateProjectProgress";
function TaskCard({ task, reload }) {

  const completeTask = async () => {

    const { error } = await supabase
      .from("tasks")
      .update({
        completed: true,
        status: "Completed",
      })
      
      .eq("id", task.id);
      await updateProjectProgress(task.project_id);

reload();

    if (error) {
      alert(error.message);
      return;
    }

    reload();
  };

  const deleteTask = async () => {

    const confirmDelete = window.confirm(
      `Delete "${task.title}" ?`
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id);
await updateProjectProgress(task.project_id);

reload();
    if (error) {
      alert(error.message);
      return;
    }

    reload();
  };

  return (
    <div
      className={`task-card ${
        task.completed ? "completed-task" : ""
      }`}
    >

      <div className="task-top">

        <div>

          <h3>{task.title}</h3>

          <p>{task.description}</p>

        </div>

        <span
          className={`task-status ${task.status
            .replace(/\s/g, "")
            .toLowerCase()}`}
        >
          {task.status}
        </span>

      </div>

      <div className="task-info">

        <div className={`task-priority ${task.priority.toLowerCase()}`}>

          <FaFlag />

          {task.priority}

        </div>

        <div className="task-date">

          <FaCalendarAlt />

          {task.due_date
            ? format(new Date(task.due_date), "dd MMM yyyy")
            : "No Due Date"}

        </div>

      </div>

      <div className="task-actions">

        {!task.completed && (

          <button
            className="complete-btn"
            onClick={completeTask}
          >
            <FaCheck />
            Complete
          </button>

        )}

        <button
          className="delete-task-btn"
          onClick={deleteTask}
        >
          <FaTrash />
          Delete
        </button>
        await logActivity(
  task.project_id,
  "Deleted",
  `Task "${task.title}" was deleted`
);

      </div>

    </div>
  );
}

export default TaskCard;