import { useEffect, useState } from "react";
import "./TimeTracker.css";
import { FaPlay, FaPause, FaStopwatch } from "react-icons/fa";

function TimeTracker({ taskId }) {

  const storageKey = `time_${taskId}`;

  const [isRunning, setIsRunning] = useState(false);

  const [seconds, setSeconds] = useState(0);

  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem(storageKey));

    if (saved) {

      setTotalTime(saved);

    }

  }, [storageKey]);

  useEffect(() => {

    let interval;

    if (isRunning) {

      interval = setInterval(() => {

        setSeconds(prev => prev + 1);

      }, 1000);

    }

    return () => clearInterval(interval);

  }, [isRunning]);

  const startTimer = () => {

    setIsRunning(true);

  };

  const pauseTimer = () => {

    setIsRunning(false);

    setTotalTime(prev => {

      const updated = prev + seconds;

      localStorage.setItem(
        storageKey,
        JSON.stringify(updated)
      );

      return updated;

    });

    setSeconds(0);

  };

  const stopTimer = () => {

    setIsRunning(false);

    setSeconds(0);

  };

  const formatTime = (sec) => {

    const hrs = Math.floor(sec / 3600);

    const mins = Math.floor((sec % 3600) / 60);

    const s = sec % 60;

    return `${hrs}h ${mins}m ${s}s`;

  };

  return (

    <div className="time-tracker">

      <h2>⏱ Time Tracking</h2>

      <div className="timer-display">

        <FaStopwatch />

        <h1>{formatTime(seconds)}</h1>

      </div>

      <div className="timer-controls">

        {!isRunning ? (

          <button className="start" onClick={startTimer}>
            <FaPlay /> Start
          </button>

        ) : (

          <button className="pause" onClick={pauseTimer}>
            <FaPause /> Pause
          </button>

        )}

        <button className="stop" onClick={stopTimer}>
          Stop
        </button>

      </div>

      <div className="total-time">

        <h3>Total Time Spent</h3>

        <p>{formatTime(totalTime)}</p>

      </div>

    </div>

  );

}

export default TimeTracker;