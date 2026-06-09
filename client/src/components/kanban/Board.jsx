import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

const Board = () => {

  const [tasks, setTasks] = useState({

    Todo: [
      {
        _id: "1",
        title: "Login UI",
        description: "Create Login Screen",
        priority: "High",
        assignee: "Pallavi",
      },
    ],

    "In Progress": [
      {
        _id: "2",
        title: "Dashboard",
        description: "Build Dashboard",
        priority: "Medium",
        assignee: "John",
      },
    ],

    Done: [
      {
        _id: "3",
        title: "Landing Page",
        description: "Completed",
        priority: "Low",
        assignee: "Alex",
      },
    ],

  });

  const onDragEnd = (result) => {

    if (!result.destination) return;

    const source = result.source.droppableId;
    const destination = result.destination.droppableId;

    const sourceItems = [...tasks[source]];
    const destItems = [...tasks[destination]];

    const [removed] = sourceItems.splice(result.source.index, 1);

    destItems.splice(result.destination.index, 0, removed);

    setTasks({
      ...tasks,
      [source]: sourceItems,
      [destination]: destItems,
    });

  };

  return (

    <DragDropContext onDragEnd={onDragEnd}>

      <div className="grid grid-cols-3 gap-6 mt-10">

        <Column title="Todo" tasks={tasks.Todo} />

        <Column title="In Progress" tasks={tasks["In Progress"]} />

        <Column title="Done" tasks={tasks.Done} />

      </div>

    </DragDropContext>

  );
};

export default Board;