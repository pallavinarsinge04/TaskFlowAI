import { FaTrash } from "react-icons/fa";

function TaskCard({ task, index, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-3">

      <div className="flex justify-between">

        <h3 className="font-bold">
          {task.title}
        </h3>

        <button onClick={() => onDelete(task.id)}>
          <FaTrash className="text-red-500" />
        </button>

      </div>

      <p className="text-gray-500 mt-2">
        {task.description}
      </p>

      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mt-3 inline-block">
        {task.priority}
      </span>

    </div>
  );
}

export default TaskCard;