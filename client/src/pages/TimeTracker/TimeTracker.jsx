import "./TimeTracker.css";
import { useEffect, useState } from "react";
import { FaPlay, FaPause, FaTrash } from "react-icons/fa";

function TimeTracker() {

  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);

    const savedLogs = JSON.parse(localStorage.getItem("timeLogs")) || [];
    setLogs(savedLogs);
  }, []);

  // LIVE TIMER
  useEffect(() => {

    let interval;

    if (activeTask) {
      interval = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [activeTask, startTime]);

  const startTimer = (task) => {
    setActiveTask(task);
    setStartTime(Date.now());
    setElapsed(0);
  };

  const stopTimer = () => {

    if (!activeTask) return;

    const newLog = {
      id: Date.now(),
      task: activeTask.title,
      time: Math.floor(elapsed / 1000),
      date: new Date().toLocaleDateString()
    };

    const updatedLogs = [...logs, newLog];

    setLogs(updatedLogs);
    localStorage.setItem("timeLogs", JSON.stringify(updatedLogs));

    setActiveTask(null);
    setStartTime(null);
    setElapsed(0);
  };

  const deleteLog = (id) => {
    const updated = logs.filter(l => l.id !== id);
    setLogs(updated);
    localStorage.setItem("timeLogs", JSON.stringify(updated));
  };

  return (

    <div className="time-container">

      {/* HEADER */}
      <div className="time-header">

        <h1>⏱️ Time Tracker</h1>
        <p>Track time spent on tasks like Clockify</p>

      </div>

      {/* ACTIVE TIMER */}
      <div className="timer-box">

        {activeTask ? (
          <>
            <h2>Working on: {activeTask.title}</h2>
            <h1>{Math.floor(elapsed / 1000)} sec</h1>

            <button className="stop-btn" onClick={stopTimer}>
              <FaPause /> Stop
            </button>
          </>
        ) : (
          <h2>Select a task to start tracking</h2>
        )}

      </div>

      {/* TASK LIST */}
      <div className="task-list">

        {tasks.map(task => (
          <div className="task-card" key={task.id}>

            <h3>{task.title}</h3>

            <button
              className="start-btn"
              onClick={() => startTimer(task)}
              disabled={!!activeTask}
            >
              <FaPlay /> Start
            </button>

          </div>
        ))}

      </div>

      {/* LOGS */}
      <div className="log-section">

        <h2>📊 Time Logs</h2>

        {logs.map(log => (
          <div className="log-card" key={log.id}>

            <div>
              <h3>{log.task}</h3>
              <p>{log.date}</p>
              <span>{log.time}s</span>
            </div>

            <button onClick={() => deleteLog(log.id)}>
              <FaTrash />
            </button>

          </div>
        ))}

      </div>

    </div>

  );

}

export default TimeTracker;