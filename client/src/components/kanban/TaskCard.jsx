function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-3 cursor-pointer hover:shadow-lg transition">
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-gray-500 text-sm mt-2">
        {task.description}
      </p>

      <div className="mt-3 flex justify-between">
        <span className="text-xs bg-blue-100 px-2 py-1 rounded">
          {task.priority}
        </span>

        <span>👤</span>
      </div>
    </div>
  );
}

export default TaskCard;