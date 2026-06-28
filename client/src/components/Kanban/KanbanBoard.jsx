import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "./KanbanColumn";
import "./KanbanBoard.css";

function KanbanBoard({ tasks, setTasks }) {

  const todo = tasks.filter(
    (task) => task.status === "Pending"
  );

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  );

  const handleDragEnd = (result) => {

    if (!result.destination) return;

    const { draggableId, destination } = result;

    const updated = tasks.map((task) => {

      if (task.id.toString() === draggableId) {

        return {

          ...task,

          status: destination.droppableId

        };

      }

      return task;

    });

    setTasks(updated);

  };

  return (

    <DragDropContext onDragEnd={handleDragEnd}>

      <div className="kanban-board">

        <KanbanColumn

          title="📋 To Do"

          status="Pending"

          tasks={todo}

        />

        <KanbanColumn

          title="🚀 In Progress"

          status="In Progress"

          tasks={progress}

        />

        <KanbanColumn

          title="✅ Completed"

          status="Completed"

          tasks={completed}

        />

      </div>

    </DragDropContext>

  );

}

export default KanbanBoard;