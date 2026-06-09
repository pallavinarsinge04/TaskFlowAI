import { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

import API from "../../api/axios";
import socket from "../../socket/socket";

import Column from "./Column";
import AddTaskModal from "./AddTaskModal";

const Board = () => {
  const [tasks, setTasks] = useState([]);

  // ==========================
  // Fetch Tasks
  // ==========================

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();

    socket.on("taskCreated", () => {
      fetchTasks();
    });

    socket.on("taskUpdated", () => {
      fetchTasks();
    });

    socket.on("taskDeleted", () => {
      fetchTasks();
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  // ==========================
  // Add Task
  // ==========================

  const addTask = async (title, description) => {
    try {
      await API.post("/tasks", {
        title,
        description,
        priority: "Medium",
        status: "todo",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Delete Task
  // ==========================

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Drag and Drop
  // ==========================

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceTasks = tasks.filter(
      (task) => task.status === source.droppableId
    );

    const movedTask = sourceTasks[source.index];

    if (!movedTask) return;

    try {
      await API.put(`/tasks/${movedTask._id}`, {
        status: destination.droppableId,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Filter Tasks
  // ==========================

  const todo = tasks.filter((task) => task.status === "todo");

  const progress = tasks.filter(
    (task) => task.status === "progress"
  );

  const review = tasks.filter(
    (task) => task.status === "review"
  );

  const done = tasks.filter(
    (task) => task.status === "done"
  );

  return (
    <div className="mt-8">

      <AddTaskModal addTask={addTask} />

      <DragDropContext onDragEnd={onDragEnd}>

        <div className="flex gap-6 overflow-x-auto pb-10">

          <Column
            title="📝 Todo"
            columnId="todo"
            tasks={todo}
            onDelete={deleteTask}
          />

          <Column
            title="🚀 In Progress"
            columnId="progress"
            tasks={progress}
            onDelete={deleteTask}
          />

          <Column
            title="🔍 Review"
            columnId="review"
            tasks={review}
            onDelete={deleteTask}
          />

          <Column
            title="✅ Done"
            columnId="done"
            tasks={done}
            onDelete={deleteTask}
          />

        </div>

      </DragDropContext>

    </div>
  );
};

export default Board;