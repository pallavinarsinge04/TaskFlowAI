import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { v4 as uuid } from "uuid";

import Column from "./Column";
import AddTaskModal from "./AddTaskModal";

const Board = () => {
  const [columns, setColumns] = useState({
    todo: [
      {
        id: uuid(),
        title: "Design Landing Page",
        description: "Create Hero Section",
        priority: "High",
      },
    ],

    progress: [
      {
        id: uuid(),
        title: "Build Authentication",
        description: "JWT Login & Register",
        priority: "Medium",
      },
    ],

    review: [
      {
        id: uuid(),
        title: "Review Dashboard",
        description: "Check UI and responsiveness",
        priority: "Low",
      },
    ],

    done: [
      {
        id: uuid(),
        title: "Project Setup",
        description: "MERN project initialized",
        priority: "Completed",
      },
    ],
  });

  // Add New Task
  const addTask = (title, description) => {
    if (!title.trim()) return;

    const newTask = {
      id: uuid(),
      title,
      description,
      priority: "Medium",
    };

    setColumns((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  // Delete Task
  const deleteTask = (id) => {
    const updatedColumns = {};

    Object.keys(columns).forEach((key) => {
      updatedColumns[key] = columns[key].filter(
        (task) => task.id !== id
      );
    });

    setColumns(updatedColumns);
  };

  // Drag and Drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = [...columns[source.droppableId]];
    const destinationColumn = [...columns[destination.droppableId]];

    const [movedTask] = sourceColumn.splice(source.index, 1);

    destinationColumn.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destinationColumn,
    });
  };

  return (
    <div className="mt-6">

      {/* Add Task Form */}
      <AddTaskModal addTask={addTask} />

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6">

          <Column
            title="📝 Todo"
            columnId="todo"
            tasks={columns.todo}
            onDelete={deleteTask}
          />

          <Column
            title="🚀 In Progress"
            columnId="progress"
            tasks={columns.progress}
            onDelete={deleteTask}
          />

          <Column
            title="🔍 Review"
            columnId="review"
            tasks={columns.review}
            onDelete={deleteTask}
          />

          <Column
            title="✅ Done"
            columnId="done"
            tasks={columns.done}
            onDelete={deleteTask}
          />

        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;