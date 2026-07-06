import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { supabase } from "../../supabase/supabaseClient";
import "./KanbanBoard.css";

function KanbanBoard({ tasks, setTasks }) {
  const columns = {
    Pending: tasks.filter((t) => t.status === "Pending"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    Completed: tasks.filter((t) => t.status === "Completed"),
  };

  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    const newStatus = destination.droppableId;

    const task = tasks.find((t) => t.id === draggableId);

    if (!task) return;

    if (task.status === newStatus) return;

    // Update UI instantly
    const updatedTasks = tasks.map((t) =>
      t.id === draggableId
        ? {
            ...t,
            status: newStatus,
          }
        : t
    );

    setTasks(updatedTasks);

    // Update Supabase
    const { error } = await supabase
      .from("tasks")
      .update({
        status: newStatus,
      })
      .eq("id", draggableId);

    if (error) {
      console.error(error);

      // Restore previous state if update fails
      setTasks(tasks);

      alert(error.message);
    }
  };

  return (
    <div className="kanban-container">
      <h1>📊 Kanban Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-columns">
          {Object.keys(columns).map((column) => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{column}</h2>

                  {columns[column].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="kanban-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h3>{task.title}</h3>

                          <p>{task.description}</p>

                          <div className="kanban-footer">
                            <span>
                              <strong>Priority:</strong>{" "}
                              {task.priority}
                            </span>

                            <span>
                              <strong>Assigned:</strong>{" "}
                              {task.assignee || "-"}
                            </span>
                          </div>

                          {task.due_date && (
                            <div className="kanban-date">
                              📅{" "}
                              {new Date(
                                task.due_date
                              ).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;