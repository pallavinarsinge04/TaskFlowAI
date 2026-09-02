import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "./KanbanColumn";
import "./KanbanBoard.css";

function KanbanBoard({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  const todo = tasks.filter(
    (task) => task.status === "Pending"
  );

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  );

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination, source } = result;

    // Same column → nothing to update
    if (
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    const taskId = draggableId;
    const newStatus = destination.droppableId;

    if (onStatusChange) {
      await onStatusChange(taskId, newStatus);
    }
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      <div className="kanban-board">

        <KanbanColumn
          title="📋 To Do"
          status="Pending"
          tasks={todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        <KanbanColumn
          title="🚀 In Progress"
          status="In Progress"
          tasks={progress}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        <KanbanColumn
          title="✅ Completed"
          status="Completed"
          tasks={completed}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;