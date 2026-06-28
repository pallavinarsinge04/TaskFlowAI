import { Draggable } from "@hello-pangea/dnd";
import {
  FaCalendarAlt,
  FaUserCircle,
  FaFlag
} from "react-icons/fa";
import "./TaskItem.css";

function TaskItem({ task, index }) {

  return (

    <Draggable
      draggableId={task.id.toString()}
      index={index}
    >

      {(provided, snapshot) => (

        <div
          className={`task-item ${
            snapshot.isDragging ? "dragging" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >

          <div className="task-top">

            <h3>{task.title}</h3>

            <span className={`priority ${task.priority}`}>

              <FaFlag />

              {task.priority}

            </span>

          </div>

          <p className="task-description">

            {task.description}

          </p>

          <div className="progress-wrapper">

            <div className="progress-text">

              <span>Progress</span>

              <span>{task.progress || 0}%</span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${task.progress || 0}%`
                }}
              ></div>

            </div>

          </div>

          <div className="task-footer">

            <span>

              <FaCalendarAlt />

              {task.dueDate}

            </span>

            <span>

              <FaUserCircle />

              {task.assignee}

            </span>

          </div>

        </div>

      )}

    </Draggable>

  );

}

export default TaskItem;