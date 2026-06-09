import Column from "./Column";

function Board() {

  const todo = [
    {
      id: 1,
      title: "Design Landing Page",
      description: "Create hero section",
      priority: "High"
    }
  ];

  const progress = [
    {
      id: 2,
      title: "Authentication",
      description: "JWT Login",
      priority: "Medium"
    }
  ];

  const review = [];

  const done = [
    {
      id: 3,
      title: "Project Setup",
      description: "MERN Installed",
      priority: "Done"
    }
  ];

  return (
    <div className="flex gap-6 overflow-x-auto">
      <Column title="📝 Todo" tasks={todo} />
      <Column title="🚀 In Progress" tasks={progress} />
      <Column title="🔍 Review" tasks={review} />
      <Column title="✅ Done" tasks={done} />
    </div>
  );
}

export default Board;