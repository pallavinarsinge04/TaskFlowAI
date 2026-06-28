import { Droppable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";
import "./KanbanColumn.css";

function KanbanColumn({ title, status, tasks }) {

  return (
    <div className="kanban-column">

      <div className="column-header">

        <h2>{title}</h2>

        <span>{tasks.length}</span>

      </div>

      <Droppable droppableId={status}>

        {(provided) => (

          <div
            className="column-body"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >

            {tasks.length === 0 ? (

              <div className="empty-column">

                <p>No Tasks</p>

              </div>

            ) : (

              tasks.map((task, index) => (

                <TaskItem
                  key={task.id}
                  task={task}
                  index={index}
                />

              ))

            )}

            {provided.placeholder}

          </div>

        )}

      </Droppable>

    </div>
  );

}

export default KanbanColumn;