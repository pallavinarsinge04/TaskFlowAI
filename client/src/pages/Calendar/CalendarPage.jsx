import "./CalendarPage.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";

function CalendarPage() {

  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  // get tasks for selected date
  const handleDateChange = (value) => {

    setDate(value);

    const filtered = tasks.filter(task =>
      task.dueDate === value.toISOString().split("T")[0]
    );

    setSelectedTasks(filtered);
  };

  // highlight dates with tasks
  const tileContent = ({ date, view }) => {

    if (view === "month") {

      const dayTasks = tasks.filter(
        task => task.dueDate === date.toISOString().split("T")[0]
      );

      return dayTasks.length ? (
        <div className="dot"></div>
      ) : null;
    }

  };

  return (

    <div className="calendar-container">

      {/* HEADER */}
      <div className="calendar-header">

        <div>
          <h1>📅 Calendar</h1>
          <p>Track deadlines & manage schedule</p>
        </div>

      </div>

      <div className="calendar-layout">

        {/* CALENDAR */}
        <div className="calendar-box">

          <Calendar
            onChange={handleDateChange}
            value={date}
            tileContent={tileContent}
          />

        </div>

        {/* TASK PANEL */}
        <div className="task-panel">

          <h2>Tasks for selected date</h2>

          {selectedTasks.length === 0 ? (
            <p>No tasks for this date</p>
          ) : (

            selectedTasks.map(task => (

              <div className="task-card" key={task.id}>

                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <span className={`status ${task.status}`}>
                  {task.status}
                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}

export default CalendarPage;