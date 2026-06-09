const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 hover:shadow-xl transition duration-300">

      <h3 className="font-bold text-lg">
        {task.title}
      </h3>

      <p className="text-gray-600 mt-2">
        {task.description}
      </p>

      <div className="mt-4 flex justify-between">

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {task.priority}
        </span>

        <span className="text-gray-500 text-sm">
          {task.assignee}
        </span>

      </div>

    </div>
  );
};

export default TaskCard;