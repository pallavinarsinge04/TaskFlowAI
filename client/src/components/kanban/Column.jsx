import TaskCard from "./TaskCard";

function Column({ title, tasks }) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 w-80 min-h-[500px]">
      <h2 className="font-bold text-xl mb-4">
        {title}
      </h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Column;