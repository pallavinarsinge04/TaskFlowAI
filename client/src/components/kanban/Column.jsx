import {
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";

function Column({ title, tasks, columnId, onDelete }) {

  return (

    <Droppable droppableId={columnId}>

      {(provided) => (

        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-200 rounded-xl p-4 w-80 min-h-[500px]"
        >

          <h2 className="font-bold text-2xl mb-4">
            {title}
          </h2>

          {tasks.map((task, index) => (

            <Draggable
              key={task.id}
              draggableId={task.id}
              index={index}
            >

              {(provided) => (

                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >

                  <TaskCard
                    task={task}
                    index={index}
                    onDelete={onDelete}
                  />

                </div>

              )}

            </Draggable>

          ))}

          {provided.placeholder}

        </div>

      )}

    </Droppable>

  );

}

export default Column;