import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { FaPlus } from "react-icons/fa";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import "./Task.css";

function TaskList({ projectId }) {

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  async function loadTasks() {

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setTasks(data);
  }

  return (
    <div className="task-list">

      <div className="task-header">

        <h2>Project Tasks</h2>

        <button
          className="add-task-btn"
          onClick={() => setShowModal(true)}
        >
          <FaPlus />
          Add Task
        </button>

      </div>

      {tasks.length === 0 ? (

        <p>No Tasks Found</p>

      ) : (

        tasks.map((task) => (

          <TaskCard
            key={task.id}
            task={task}
            reload={loadTasks}
          />

        ))

      )}

      {showModal && (

        <AddTaskModal
          projectId={projectId}
          close={() => setShowModal(false)}
          reload={loadTasks}
        />

      )}

    </div>
  );
}

export default TaskList;