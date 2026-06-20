const TaskFilters = ({
  status,
  setStatus,
  priority,
  setPriority,
}) => {
  return (
    <div className="flex gap-4 mt-4">

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border p-2 rounded"
      >
        <option>All</option>
        <option>Todo</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
        className="border p-2 rounded"
      >
        <option>All</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

    </div>
  );
};

export default TaskFilters;