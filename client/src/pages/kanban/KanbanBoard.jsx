import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./KanbanBoard.css";

function KanbanBoard() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(data);
  }, []);

  const columns = {
    Pending: tasks.filter(t => t.status === "Pending"),
    "In Progress": tasks.filter(t => t.status === "In Progress"),
    Completed: tasks.filter(t => t.status === "Completed")
  };

  const onDragEnd = (result) => {

    const { destination, source, draggableId } = result;

    if (!destination) return;

    const updatedTasks = [...tasks];

    const task = updatedTasks.find(t => t.id.toString() === draggableId);

    task.status = destination.droppableId;

    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="kanban-container">

      <h1>📊 Kanban Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>

        {Object.keys(columns).map((column) => (

          <Droppable droppableId={column} key={column}>

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
                    draggableId={task.id.toString()}
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

                      </div>

                    )}

                  </Draggable>

                ))}

                {provided.placeholder}

              </div>

            )}

          </Droppable>

        ))}

      </DragDropContext>

    </div>
  );
}

export default KanbanBoard;