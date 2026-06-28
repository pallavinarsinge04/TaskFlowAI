import { Draggable } from "@hello-pangea/dnd";
import {
  FaCalendarAlt,
  FaUserCircle,
  FaFlag,
  FaPaperclip,
  FaCommentDots,
  FaStar
} from "react-icons/fa";
import "./TaskItem.css";

function TaskItem({ task, index }) {

  const overdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Completed";

  return (

    <Draggable
      draggableId={task.id.toString()}
      index={index}
    >

      {(provided, snapshot) => (

        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-item ${snapshot.isDragging ? "dragging" : ""} ${overdue ? "overdue" : ""}`}
        >

          <div className="task-top">

            <h3>{task.title}</h3>

            <FaStar className="star"/>

          </div>

          <p className="task-description">

            {task.description}

          </p>

          <div className="badge-row">

            <span className={`priority ${task.priority}`}>
              <FaFlag/>
              {task.priority}
            </span>

            <span className="category">

              {task.category || "General"}

            </span>

          </div>

          <div className="progress-wrapper">

            <div className="progress-text">

              <span>Progress</span>

              <span>{task.progress}%</span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: `${task.progress}%` }}
              />

            </div>

          </div>

          <div className="task-footer">

            <span>

              <FaCalendarAlt/>

              {task.dueDate}

            </span>

            <span>

              <FaUserCircle/>

              {task.assignee}

            </span>

          </div>

          <div className="task-bottom">

            <span>

              <FaPaperclip/>

              2

            </span>

            <span>

              <FaCommentDots/>

              5

            </span>

          </div>

        </div>

      )}

    </Draggable>

  );

}

export default TaskItem;